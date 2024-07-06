type RedisKey = string
type RedisValue = { value: string; expiry: number | null }

export class RedisStore {
  private static instance: RedisStore
  private store: Map<RedisKey, RedisValue>

  private constructor() {
    this.store = new Map()
  }

  public static getInstance(): RedisStore {
    if (!RedisStore.instance) {
      RedisStore.instance = new RedisStore()
    }
    return RedisStore.instance
  }

  set(key: RedisKey, value: string, expiry?: number) {
    this.store.set(key, { value, expiry: expiry || null })
  }

  get(key: RedisKey): string | undefined {
    const entry = this.store.get(key)
    if (!entry) return undefined
    if (!entry.expiry) return entry.value

    const currentTimestamp = new Date().getTime()
    if (currentTimestamp <= entry.expiry) return entry.value

    this.store.delete(key)
    return undefined
  }
}
