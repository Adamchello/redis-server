type RedisKey = string
type RedisValue = { value: string; expiry: number | null }

export class RedisStore {
  private store: Map<RedisKey, RedisValue>

  constructor() {
    this.store = new Map()
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
