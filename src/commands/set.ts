import { serialize } from '../utils/serialization.js'
import { ERRORS } from '../utils/constants.js'
import { RedisStore } from '../services/RedisStore.js'
import { AVAILABLE_EXPIRY_TYPES, getExpiryTimeInMilliseconds } from '../utils/expiration.js'
import { parseInputValue } from '../utils/parsing.js'

export function handleSet(args: string[], store: RedisStore) {
  if (args.length !== 2 && args.length !== 4) {
    return serialize(ERRORS.COMMAND.MISSING_SET_ARGUMENTS, 'error')
  }

  if (args.length === 2) {
    const [key, value] = args

    const parsedValue = parseInputValue(value)
    store.set(key, parsedValue)

    return serialize('OK', 'simpleString')
  }

  const [key, value, expiryType, expiryTimeString] = args

  if (!AVAILABLE_EXPIRY_TYPES.includes(expiryType)) {
    return serialize(ERRORS.COMMAND.INVALID_SET_EXPIRY_TYPE, 'error')
  }

  const expiryTimeValue = Number(expiryTimeString)
  if (Number.isNaN(expiryTimeValue)) {
    return serialize(ERRORS.COMMAND.INVALID_SET_EXPIRY_VALUE, 'error')
  }

  const expiryTimestamp = getExpiryTimeInMilliseconds(expiryType, expiryTimeValue)
  const parsedValue = parseInputValue(value)

  store.set(key, parsedValue, expiryTimestamp)

  return serialize('OK', 'simpleString')
}
