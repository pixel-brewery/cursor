// #region Imports

import { join } from 'node:path';
import { AuthManager, ProfileManager, type IAuthHandle } from '@pixel-brewery/synapse-auth';
import { AiError, type IAiInstance } from '@pixel-brewery/synapse-core';
import { ClaudeDriver } from '@pixel-brewery/synapse-provider-claude';
import { CodexDriver } from '@pixel-brewery/synapse-provider-codex';
import { OpenCodeDriver } from '@pixel-brewery/synapse-provider-opencode';
import { AiRuntime, NodeProcessRunner } from '@pixel-brewery/synapse-runtime';
import { z } from 'zod';
import type { ChatMessage } from '../../contracts/ChatMessage.js';
import {
    desktopLoginResponseSchema,
    localConnectionSchema,
    type DesktopConnectionState,
    type DesktopLoginResponse,
    type LocalConnection,
} from '../../contracts/DesktopConnection.js';
import { chatReplySchema, chatRequestSchema, type ChatReply } from '../../contracts/chat.js';
import { chatInstructions } from '../configuration/chatInstructions.js';
import { findNativeExecutable } from '../configuration/findNativeExecutable.js';
import {
    readLocalConnection,
    writeLocalConnection,
} from '../configuration/localConnectionStore.js';
import { readNativeLoginUrl } from '../configuration/readNativeLoginUrl.js';

// #endregion

const applicationId = 'pixel-brewery-cursor';
const outputSchema = z.toJSONSchema(chatReplySchema);
const chatTimeoutMs = 60_000;

interface IActiveChat {
    readonly abort: AbortController;
    readonly instance: IAiInstance;
    readonly result: Promise<ChatReply>;
}

/** Owns the reference desktop's isolated native account, authentication and inference. */
export class LocalAssistant {
    // #region Fields

    private readonly _file: string;
    private readonly _profiles: ProfileManager;
    private readonly _runner = new NodeProcessRunner();
    private readonly _drivers = {
        codex: new CodexDriver(this._runner),
        claude: new ClaudeDriver(this._runner),
        opencode: new OpenCodeDriver(this._runner),
    };
    private readonly _runtime = new AiRuntime({
        drivers: Object.values(this._drivers),
        instances: [],
    });
    private readonly _auth = new AuthManager(this._runtime.access);
    private readonly _lifetime = new AbortController();
    private _tail: Promise<void> = Promise.resolve();
    private _selection: LocalConnection | null = null;
    private _loaded = false;
    private _status: DesktopConnectionState['status'] = 'unchecked';
    private _instance: IAiInstance | undefined;
    private _login: IAuthHandle | undefined;
    private _chat: IActiveChat | undefined;
    private _disposal: Promise<void> | undefined;

    // #endregion

    // #region Ctor

    /**
     * Composes an inert Synapse runtime.
     *
     * @param userData - Electron's private application data directory.
     */
    public constructor(userData: string) {
        const root = join(userData, 'local-assistant');
        this._file = join(root, 'connection.json');
        this._profiles = new ProfileManager({ rootDirectory: join(root, 'profiles') });
    }

    // #endregion

    // #region Methods

    /** Reads the saved selection and current state without checking or signing in. */
    public getState(): Promise<DesktopConnectionState> {
        return this.transition(() => this.snapshot());
    }

    /** Saves the non-secret selection before checking its isolated native status. */
    public save(connection: LocalConnection): Promise<DesktopConnectionState> {
        return this.transition(async () => {
            const selection = localConnectionSchema.parse(connection);
            if (JSON.stringify(selection) !== JSON.stringify(this._selection)) {
                const chat = this._chat;
                chat?.abort.abort();
                await this._login?.cancel();
                await chat?.result.catch(() => undefined);
                await writeLocalConnection(this._file, selection);
                this._selection = selection;
                this._instance = undefined;
                this._login = undefined;
                this._status = 'unchecked';
            }
            return this.checkSelection();
        });
    }

    /** Checks the installed executable and isolated native authentication without login. */
    public check(): Promise<DesktopConnectionState> {
        return this.transition(() => this.checkSelection());
    }

    /** Starts exactly the native method explicitly requested from the advertised choices. */
    public startLogin(methodId: string): Promise<DesktopConnectionState> {
        return this.transition(() => {
            const instance = this._instance;
            const driver = this._selection && this._drivers[this._selection.provider].auth;
            if (!instance || !driver || !this.loginMethods().some(({ id }) => id === methodId))
                throw new Error('Select an available native sign-in method.');
            if (this.isLoginActive()) return this.snapshot();

            const handle = this._auth.start(instance, driver, {
                ownerId: applicationId,
                methodId,
                signal: this._lifetime.signal,
            });
            this._login = handle;
            void handle.result.then(
                () => {
                    if (this._login === handle) this._status = 'ready';
                },
                () => {
                    if (this._login === handle && handle.state.state === 'failed') {
                        this._status = 'error';
                    }
                },
            );
            return this.snapshot();
        });
    }

    /** Forwards only a correlated current login response and keeps input in memory. */
    public respondLogin(response: DesktopLoginResponse): Promise<DesktopConnectionState> {
        return this.transition(() => {
            const payload = desktopLoginResponseSchema.parse(response);
            const handle = this._login;
            if (!handle || Object.values(payload.values).some((value) => /[\r\n\0]/u.test(value)))
                throw new Error('The native sign-in response is invalid.');

            handle.respond({ ...payload, ownerId: applicationId });
            return this.snapshot();
        });
    }

    /** Cancels the current native login and waits for its cleanup. */
    public cancelLogin(): Promise<DesktopConnectionState> {
        return this.transition(async () => {
            await this._login?.cancel();
            return this.snapshot();
        });
    }

    /** Returns the current native authorization URL when it can be opened externally. */
    public getLoginUrl(): string | undefined {
        if (this._lifetime.signal.aborted) return undefined;
        const state = this._login?.state;
        if (state?.state !== 'waiting' || state.interaction.expiresAt <= Date.now())
            return undefined;

        return readNativeLoginUrl(state.interaction.url)?.href;
    }

    /** Runs one bounded structured text turn against the currently verified native account. */
    public async chat(messages: readonly ChatMessage[], signal: AbortSignal): Promise<ChatReply> {
        const request = chatRequestSchema.parse({ messages });
        const active = await this.transition(() => {
            const instance = this._instance;
            const selection = this._selection;
            if (!instance || !selection || this._status !== 'ready' || this.isLoginActive())
                throw new Error('Check and connect the selected native account before using chat.');
            if (this._chat) throw new Error('Another assistant request is still running.');

            signal.throwIfAborted();
            const abort = new AbortController();
            const lifetime = AbortSignal.any([signal, abort.signal, this._lifetime.signal]);
            const prompt = `${chatInstructions}\n\nConversation in order (JSON):\n${JSON.stringify(request.messages)}`;
            const run = this._runtime.run({
                target: { instanceId: instance.id },
                prompt,
                policy: {
                    mode: 'read-only',
                    ...(selection.provider === 'claude' ? { allowedTools: [] } : {}),
                },
                outputSchema,
                deadline: Date.now() + chatTimeoutMs,
                signal: lifetime,
                ...(selection.model === undefined ? {} : { model: selection.model }),
            });
            const result = run.result.then((response) => {
                lifetime.throwIfAborted();
                return chatReplySchema.parse(response.structured);
            });
            const chat = { abort, instance, result };
            this._chat = chat;
            return chat;
        });

        try {
            return await active.result;
        } catch (error) {
            if (
                this._instance === active.instance &&
                error instanceof AiError &&
                error.code === 'auth-required'
            )
                this._status = 'signed-out';
            throw error;
        } finally {
            if (this._chat === active) this._chat = undefined;
        }
    }

    /** Aborts owned work and waits for Synapse to clean up its processes. */
    public dispose(): Promise<void> {
        if (this._disposal) return this._disposal;
        this._lifetime.abort();
        this._disposal = Promise.allSettled([
            this._tail,
            this._auth.dispose(),
            this._runtime.dispose(),
        ]).then(async (outcomes) => {
            await this._runner.dispose();
            const failure = outcomes.find((outcome) => outcome.status === 'rejected');
            if (failure)
                throw new Error('Native assistant cleanup did not complete.', {
                    cause: failure.reason,
                });
        });
        return this._disposal;
    }

    private transition<T>(operation: () => T | Promise<T>): Promise<T> {
        const next = this._tail.then(async () => {
            this._lifetime.signal.throwIfAborted();
            if (!this._loaded) {
                this._selection = await readLocalConnection(this._file);
                this._loaded = true;
            }
            this._lifetime.signal.throwIfAborted();
            return operation();
        });
        this._tail = next.then(
            () => undefined,
            () => undefined,
        );
        return next;
    }

    private async checkSelection(): Promise<DesktopConnectionState> {
        const selection = this._selection;
        if (!selection || this.isLoginActive()) return this.snapshot();

        const executable = await findNativeExecutable(selection.provider);
        if (!executable) {
            this._instance = undefined;
            this._status = 'missing';
            return this.snapshot();
        }

        const driver = this._drivers[selection.provider];
        try {
            const profile = await this._profiles.create({
                applicationId,
                accountId: selection.provider === 'opencode' ? selection.providerId : 'default',
                driverId: driver.id,
            });
            const instance: IAiInstance = {
                id: selection.provider,
                driverId: driver.id,
                profile,
                executable,
                ...(selection.provider === 'opencode'
                    ? {
                          configuration: {
                              providerId: selection.providerId,
                              authMethod: selection.authMethod,
                          },
                      }
                    : {}),
            };
            if (!this._instance || this._instance.executable !== executable) {
                await this._runtime.configureInstance(instance);
                this._instance = instance;
            }
            const status = await this._auth.status(instance, driver.auth, this._lifetime.signal);
            this._status = status.authenticated ? 'ready' : 'signed-out';
        } catch {
            this._status = 'error';
        }
        return this.snapshot();
    }

    private isLoginActive(): boolean {
        const state = this._login?.state.state;
        return state === 'starting' || state === 'waiting' || state === 'verifying';
    }

    private loginMethods(): DesktopConnectionState['methods'] {
        const instance = this._instance;
        const driver = this._selection && this._drivers[this._selection.provider].auth;
        if (!instance || !driver) return [];

        return driver
            .methods(instance)
            .filter(({ kind }) => kind !== 'credentials')
            .map(({ id, label }) => ({ id, label }));
    }

    private snapshot(): DesktopConnectionState {
        const state = this._login?.state;
        const currentInteraction = state?.state === 'waiting' ? state.interaction : undefined;
        const login: DesktopConnectionState['login'] = state
            ? {
                  operationId: state.operationId,
                  state:
                      state.state === 'starting' || state.state === 'verifying'
                          ? 'running'
                          : state.state,
                  ...(currentInteraction
                      ? {
                            interaction: {
                                id: currentInteraction.id,
                                hasUrl: this.getLoginUrl() !== undefined,
                                fields: currentInteraction.fields ?? [],
                                ...(currentInteraction.message === undefined
                                    ? {}
                                    : { message: currentInteraction.message }),
                                ...(currentInteraction.code === undefined
                                    ? {}
                                    : { code: currentInteraction.code }),
                            },
                        }
                      : {}),
              }
            : null;
        return {
            connection: this._selection,
            status: this._status,
            methods: this.loginMethods(),
            login,
        };
    }

    // #endregion
}
