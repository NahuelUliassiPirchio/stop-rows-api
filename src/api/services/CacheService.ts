interface CacheEntry<T> {
    value: T;
    expiresAt: number;
}

class CacheService {
    private store = new Map<string, CacheEntry<unknown>>();

    set<T>(key: string, value: T, ttlSeconds: number): void {
        this.store.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
    }

    get<T>(key: string): T | null {
        const entry = this.store.get(key);
        if (!entry) return null;
        if (Date.now() > entry.expiresAt) {
            this.store.delete(key);
            return null;
        }
        console.log(`[CACHE HIT] ${key}`);
        return entry.value as T;
    }

    del(key: string): void {
        this.store.delete(key);
    }

    delByPrefix(prefix: string): void {
        for (const key of this.store.keys()) {
            if (key.startsWith(prefix)) this.store.delete(key);
        }
    }

    clear(): void {
        this.store.clear();
    }
}

export default new CacheService();
