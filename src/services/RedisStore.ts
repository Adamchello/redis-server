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

  set(key: RedisKey, value: string) {
    this.store.set(key, { value, expiry: null })
  }

  get(key: RedisKey): string | undefined {
    const entry = this.store.get(key)
    if (!entry) return undefined
    return entry.value
  }
}
