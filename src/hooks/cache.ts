// src/lib/cache.ts

// import { fetchConfig } from "../utils/fetchConfig";

interface CachedResponse {
    body: string;
    status: number;
    statusText: string;
    headers: HeadersInit;
}

type CacheEntry<T> = {
    data: T;
    expiry: number;
};
// const expiresIn = fetchConfig.cacheTime || 60 *1000;
export const cache: Map<string, CacheEntry<CachedResponse>> = new Map();

export function getFromCache(key: string): CachedResponse | null {
    const entry = cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
        cache.delete(key);
        return null;
    }

    return entry.data;
}

export function setToCache(key: string, data: CachedResponse, expiresIn: number = 60 * 1000): void {
    // Default Cache time is 1 min
    const expiry = Date.now() + expiresIn;
    cache.set(key, { data, expiry });
}

export function clearCache(key: string): void {
    cache.delete(key);
}
