import { startReferenceServer } from './server.js';

const port = process.env.CURSOR_REFERENCE_PORT === undefined ? 4317 : Number(process.env.CURSOR_REFERENCE_PORT);
if (!Number.isInteger(port) || port < 1024 || port > 65535) {
    throw new Error('CURSOR_REFERENCE_PORT must be a user port from 1024 to 65535.');
}
const server = await startReferenceServer(port);
console.log(`Cursor reference demo ready at ${server.origin}`);

const stop = async () => {
    await server.close();
    process.exitCode = 0;
};
process.once('SIGINT', stop);
process.once('SIGTERM', stop);
