import { serialize } from '../utils/serialization.js'
import { ERRORS } from '../utils/constants.js'
import { RedisStore } from '../services/RedisStore.js'

export function handleExists(args: string[], store: RedisStore) {
  if (args.length === 0) {
    return serialize(ERRORS.COMMAND.MISSING_EXISTS_ARGUMENT, 'error')
  }

  let counter = 0

  for (const key of args) {
    if (store.hasKey(key)) counter++
  }

  return serialize(counter, 'integer')
}
