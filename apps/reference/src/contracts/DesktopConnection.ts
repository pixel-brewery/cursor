// #region Imports

import { z } from 'zod';
import { chatRequestSchema, type ChatReply } from './chat.js';
import type { ChatMessage } from './ChatMessage.js';

// #endregion

const identifier = z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z\d][\w.:/-]*$/iu);
const nativeMethod = z.string().trim().min(1).max(120);

/** Only native CLI connections and provider-specific, non-secret configuration cross IPC. */
export const localConnectionSchema = z.discriminatedUnion('provider', [
    z.strictObject({ provider: z.literal('codex'), model: identifier.optional() }),
    z.strictObject({ provider: z.literal('claude'), model: identifier.optional() }),
    z
        .strictObject({
            provider: z.literal('opencode'),
            model: identifier.regex(/^[^/]+\/.+$/u),
            providerId: identifier,
            authMethod: nativeMethod,
        })
        .refine((connection) => connection.model.startsWith(`${connection.providerId}/`), {
            path: ['model'],
            message: 'OpenCode model must belong to the selected native provider.',
        }),
]);

/** Serializable settings for the selected native CLI. */
export type LocalConnection = z.infer<typeof localConnectionSchema>;

/** Validates one in-memory response to the current, correlated login interaction. */
export const desktopLoginResponseSchema = z.strictObject({
    operationId: identifier,
    interactionId: identifier,
    values: z
        .record(identifier, z.string().max(4096))
        .refine((values) => Object.keys(values).length <= 8),
});

/** Native authentication inputs. Values are forwarded from the renderer to the current flow. */
export type DesktopLoginResponse = z.infer<typeof desktopLoginResponseSchema>;

/** Validates the chat request identifier and conversation at the IPC boundary. */
export const desktopChatRequestSchema = chatRequestSchema.safeExtend({
    requestId: z.uuid(),
});

/** Current state of the selected, isolated Synapse connection. */
export interface DesktopConnectionState {
    readonly connection: LocalConnection | null;
    readonly status: 'unchecked' | 'missing' | 'signed-out' | 'ready' | 'error';
    readonly methods: readonly { readonly id: string; readonly label: string }[];
    readonly login: {
        readonly operationId: string;
        readonly state: 'running' | 'waiting' | 'succeeded' | 'failed' | 'cancelled';
        readonly interaction?: {
            readonly id: string;
            readonly message?: string;
            readonly hasUrl: boolean;
            readonly code?: string;
            readonly fields: readonly {
                readonly id: string;
                readonly label: string;
                readonly secret: boolean;
                readonly required?: boolean;
            }[];
        };
    } | null;
}

/** Explicit capabilities exposed to the isolated Electron renderer. */
export interface DesktopConnectionBridge {
    /** Read the stored selection and current connection state. */
    getState(): Promise<DesktopConnectionState>;
    /** Save a local selection and validate the configured CLI. */
    save(connection: LocalConnection): Promise<DesktopConnectionState>;
    /** Check the installed executable and native authentication state. */
    check(): Promise<DesktopConnectionState>;
    /** Start an authentication method currently advertised by the selected CLI. */
    startLogin(methodId: string): Promise<DesktopConnectionState>;
    /** Forward inputs for a correlated authentication interaction. */
    respondLogin(response: DesktopLoginResponse): Promise<DesktopConnectionState>;
    /** Cancel the active login and release its native process. */
    cancelLogin(): Promise<DesktopConnectionState>;
    /** Open the current native sign-in page in the system browser. */
    openLogin(): Promise<void>;
    /** Run one bounded text request and validate the resulting cursor suggestion. */
    chat(request: {
        readonly requestId: string;
        readonly messages: readonly ChatMessage[];
    }): Promise<ChatReply>;
    /** Abort a previously submitted chat request owned by this renderer. */
    cancelChat(requestId: string): Promise<void>;
}

declare global {
    interface Window {
        readonly cursorDesktop?: DesktopConnectionBridge;
    }
}
