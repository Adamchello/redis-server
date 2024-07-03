import { serialize } from '../utils/serialization.js'
import { ERRORS } from '../utils/constants.js'
import { RedisStore } from '../services/RedisStore.js'

export function handleGet(args: string[], store: RedisStore) {
  if (args.length !== 1) {
    return serialize(ERRORS.COMMAND.MISSING_GET_ARGUMENT, 'error')
  }

  const key = args[0]
  const storeValue = store.get(key)

  if (storeValue === undefined) {
    return serialize(ERRORS.COMMAND.GET_KEY_NOT_FOUND, 'error')
  }

  return serialize(storeValue, 'bulkString')
}
