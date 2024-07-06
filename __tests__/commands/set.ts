import { handleSet } from '../../src/commands/set.js'
import { RedisStore } from '../../src/services/RedisStore.js'
import { ERRORS } from '../../src/utils/constants.js'
import { serialize } from '../../src/utils/serialization.js'

describe('Set command function', () => {
  let store: RedisStore

  beforeEach(() => {
    store = RedisStore.getInstance()
  })

  it('should answer with error if arguments length is not 2 or 4', () => {
    const result = handleSet(['key'], store)
    expect(result).toBe(serialize(ERRORS.COMMAND.MISSING_SET_ARGUMENTS, 'error'))

    const result2 = handleSet(['key', 'value', 'PX'], store)
    expect(result2).toBe(serialize(ERRORS.COMMAND.MISSING_SET_ARGUMENTS, 'error'))
  })

  it('should return error if invalid expiry type is provided', () => {
    const result = handleSet(['key', 'value', 'INVALID_TYPE', '1000'], store)
    expect(result).toBe(serialize(ERRORS.COMMAND.INVALID_SET_EXPIRY_TYPE, 'error'))
  })

  it('should return error if expiry time is not a number', () => {
    const result = handleSet(['key', 'value', 'PX', 'invalid_time'], store)
    expect(result).toBe(serialize(ERRORS.COMMAND.INVALID_SET_EXPIRY_VALUE, 'error'))
  })

  it('should return OK and save value to store if arguments length is 2', () => {
    const key = 'myKey'
    const value = 'myValue'

    const result = handleSet([key, value], store)
    expect(result).toBe(serialize('OK', 'simpleString'))

    const storeValue = store.get(key)
    expect(storeValue).toBe(value)
  })

  it('should return OK and save value to store if valid expiry type and time are provided', () => {
    const key = 'myKey'
    const value = 'myValue'
    const expiryType = 'PX'
    const expiryTime = '1000'

    const result = handleSet([key, value, expiryType, expiryTime], store)
    expect(result).toBe(serialize('OK', 'simpleString'))

    const storeValue = store.get(key)
    expect(storeValue).toBe(value)
  })
})
