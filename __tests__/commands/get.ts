import { handleGet } from '../../src/commands/get.js'
import { ERRORS } from '../../src/utils/constants.js'
import { serialize } from '../../src/utils/serialization.js'
import { RedisStore } from '../../src/services/RedisStore.js'

describe('Get command function', () => {
  let store: RedisStore

  beforeEach(() => {
    store = RedisStore.getInstance()
    jest.spyOn(store, 'get')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should answer with error if arguments length is not 1', () => {
    const result = handleGet([], store)

    expect(result).toBe(serialize(ERRORS.COMMAND.MISSING_GET_ARGUMENT, 'error'))
  })

  it('should call store.get with the correct key', () => {
    const key = 'myKey'

    handleGet([key], store)

    expect(store.get).toHaveBeenCalledWith(key)
  })

  it('should return error if key is not found in the store', () => {
    const key = 'nonExistingKey'
    const result = handleGet([key], store)

    expect(result).toBe(serialize(ERRORS.COMMAND.GET_KEY_NOT_FOUND, 'error'))
  })

  it('should return the value if key is found in the store', () => {
    const key = 'myKey'
    const value = 'myValue'
    store.set(key, value)

    const result = handleGet([key], store)

    expect(result).toBe(serialize(value, 'bulkString'))
  })

  it('should not return the value if expiration time past', () => {
    const key = 'someKey'
    const value = 'myValue'
    const expirationTime = new Date('2000-01-01').getTime()

    store.set(key, value, expirationTime)

    const result = handleGet([key], store)

    expect(result).toBe(serialize(ERRORS.COMMAND.GET_KEY_NOT_FOUND, 'error'))
  })
})
