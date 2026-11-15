// #region Imports

import { isIP } from 'node:net';

// #endregion

/** Accepts a provider HTTPS page or an explicit loopback native-auth page. */
export function readNativeLoginUrl(address: string | undefined): URL | undefined {
    const url = address ? URL.parse(address) : null;
    if (!url || url.username || url.password) return undefined;

    const hostname = url.hostname.replace(/^\[|\]$/gu, '');
    const loopback = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
    if (
        (url.protocol === 'http:' && loopback) ||
        (url.protocol === 'https:' && (loopback || isIP(hostname) === 0))
    )
        return url;

    return undefined;
}
