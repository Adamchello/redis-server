import { serialize } from '../utils/serialization.js'
import { ERRORS } from '../utils/constants.js'
import { RedisStore } from '../services/RedisStore.js'
import { AVAILABLE_EXPIRY_TYPES, getExpiryTimeInMilliseconds } from '../utils/expiration.js'

export function handleSet(args: string[], store: RedisStore) {
  if (args.length === 2) {
    const [key, value] = args
    store.set(key, value)

    return serialize('OK', 'simpleString')
  } else if (args.length === 4) {
    const [key, value, expiryType, expiryTimeString] = args

    if (!AVAILABLE_EXPIRY_TYPES.includes(expiryType)) {
      return 'not_found'
    }

    const expiryTimeValue = Number(expiryTimeString)
    if (Number.isNaN(expiryTimeValue)) {
      return 'invalid arguemnt'
    }

    const expiryTimestamp = getExpiryTimeInMilliseconds(expiryType, expiryTimeValue)
    store.set(key, value, expiryTimestamp)

    return serialize('OK', 'simpleString')
  }

  return serialize(ERRORS.COMMAND.MISSING_SET_ARGUMENTS, 'error')
}
