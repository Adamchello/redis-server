import { handleSet } from '../../src/commands/set.js'
import { RedisStore } from '../../src/services/RedisStore.js'
import { ERRORS } from '../../src/utils/constants.js'
import { serialize } from '../../src/utils/serialization.js'

describe('Set command function', () => {
  let store: RedisStore

  beforeEach(() => {
    store = RedisStore.getInstance()
    jest.spyOn(store, 'set')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should answer with error if arguments length is not 2', () => {
    const result = handleSet(['key'], store)

    expect(result).toBe(serialize(ERRORS.COMMAND.MISSING_SET_ARGUMENTS, 'error'))
  })

  it('should call store.set with the correct key and value', () => {
    const key = 'myKey'
    const value = 'myValue'

    handleSet([key, value], store)

    expect(store.set).toHaveBeenCalledWith(key, value)
  })

  it('should return OK if arguments length is 2', () => {
    const key = 'myKey'
    const value = 'myValue'

    const result = handleSet([key, value], store)

    expect(result).toBe(serialize('OK', 'simpleString'))
  })
})
