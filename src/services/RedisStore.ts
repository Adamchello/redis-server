type RedisKey = string
type RedisValue = { value: string | number | (number | string)[]; expiry: number | null }

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

  set(key: RedisKey, value: RedisValue['value'], expiry?: number) {
    this.store.set(key, { value, expiry: expiry || null })
  }

  hasKey(key: RedisKey) {
    return this.store.has(key)
  }

  delete(key: RedisKey) {
    return this.store.delete(key)
  }

  clear() {
    this.store.clear()
  }

  get(key: RedisKey): RedisValue['value'] | undefined {
    const entry = this.store.get(key)
    if (!entry) return undefined
    if (!entry.expiry) return entry.value

    const currentTimestamp = new Date().getTime()
    if (currentTimestamp <= entry.expiry) return entry.value

    this.store.delete(key)
    return undefined
  }
}
