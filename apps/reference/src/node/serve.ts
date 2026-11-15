// #region Imports

import { readReferencePort } from './configuration/readReferencePort.js';
import { startReferenceServer } from './services/startReferenceServer.js';

// #endregion

const port = readReferencePort(process.env.CURSOR_REFERENCE_PORT);
const server = await startReferenceServer(port);
console.log(`Cursor reference demo ready at ${server.origin}`);

const stop = async () => {
    await server.close();
    process.exitCode = 0;
};
process.once('SIGINT', stop);
process.once('SIGTERM', stop);
