// #region Imports

import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';
import { openPrompt, replies, showPrompt } from './reference.fixture.js';

// #endregion

/**
 * Provides an isolated, executable native CLI fixture for the real Synapse process driver.
 *
 * @returns Environment overrides and the operation that removes fixture files.
 */
export async function createNativeCliFixture(): Promise<{
    readonly env: NodeJS.ProcessEnv;
    readonly dataDirectory: string;
    completeLogin(): Promise<void>;
    close(): Promise<void>;
}> {
    const root = await mkdtemp(join(tmpdir(), 'cursor-desktop-e2e-'));
    const bin = join(root, 'bin');
    const data = join(root, 'data');
    const loginRelease = join(root, 'approve-login');
    try {
        await Promise.all([mkdir(bin), mkdir(data)]);
        await writeFile(
            join(bin, 'codex'),
            `#!${process.execPath}
const fs = require('node:fs');
const { join } = require('node:path');
const args = process.argv.slice(2);
const account = join(process.env.CODEX_HOME, 'auth.json');
if (args.includes('--version')) {
    console.log('codex-cli 0.164.0');
} else if (args[0] === 'login' && args[1] === 'status') {
    if (fs.existsSync(account)) console.log('Logged in using ChatGPT');
    else process.exitCode = 1;
} else if (args[0] === 'login' && args.length === 1) {
    console.log('https://auth.openai.com/oauth/authorize?state=fixture');
    const waitForApproval = setInterval(() => {
        if (!fs.existsSync(${JSON.stringify(loginRelease)})) return;
        clearInterval(waitForApproval);
        fs.writeFileSync(account, '{"auth_mode":"chatgpt"}');
    }, 20);
} else if (args.includes('exec') && args.includes('--output-schema') && args.includes('read-only')) {
    if (!fs.existsSync(account)) process.exit(23);
    const prompt = fs.readFileSync(0, 'utf8');
    const show = ${JSON.stringify(showPrompt)};
    const open = ${JSON.stringify(openPrompt)};
    const reply = prompt.lastIndexOf(open) > prompt.lastIndexOf(show)
        ? ${JSON.stringify(replies.get(openPrompt))}
        : ${JSON.stringify(replies.get(showPrompt))};
    console.log(JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: JSON.stringify(reply) } }));
} else {
    process.exitCode = 23;
}
`,
            { mode: 0o700 },
        );
        return {
            env: {
                ...process.env,
                PATH: [bin, process.env.PATH].filter(Boolean).join(delimiter),
            },
            dataDirectory: data,
            completeLogin: () => writeFile(loginRelease, ''),
            close: () => rm(root, { recursive: true, force: true }),
        };
    } catch (error) {
        await rm(root, { recursive: true, force: true });
        throw error;
    }
}
