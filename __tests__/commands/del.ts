import { handleDelete } from '../../src/commands/del.js'
import { ERRORS } from '../../src/utils/constants.js'
import { serialize } from '../../src/utils/serialization.js'
import { RedisStore } from '../../src/services/RedisStore.js'

describe('Delete command function', () => {
  let store: RedisStore

  beforeEach(() => {
    store = RedisStore.getInstance()
    store.clear()
  })

  it('should answer with error if arguments length is 0', () => {
    const result = handleDelete([], store)

    expect(result).toBe(serialize(ERRORS.COMMAND.MISSING_DEL_ARGUMENT, 'error'))
  })

  it('should return 0 if no keys are found in the store', () => {
    const result = handleDelete(['key1', 'key2'], store)

    expect(result).toBe(serialize(0, 'integer'))
  })

  it('should return the correct count of deleted keys', () => {
    store.set('key1', 'value1')
    store.set('key2', 'value2')

    const result = handleDelete(['key1', 'key3', 'key2'], store)

    expect(result).toBe(serialize(2, 'integer'))
  })
})
