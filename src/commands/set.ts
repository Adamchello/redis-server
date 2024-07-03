import { serialize } from '../utils/serialization.js'
import { ERRORS } from '../utils/constants.js'
import { RedisStore } from '../services/RedisStore.js'

export function handleSet(args: string[], store: RedisStore) {
  if (args.length !== 2) {
    return serialize(ERRORS.COMMAND.MISSING_SET_ARGUMENTS, 'error')
  }

  const [key, value] = args
  store.set(key, value)

  return serialize('OK', 'simpleString')
}
