import { ERRORS } from '../constans.js'
import { deserializeArray } from './array.js'
import { deserializeBulkString } from './bulk-string.js'
import { deserializeInteger } from './integer.js'

// https://redis.io/docs/latest/develop/reference/protocol-spec/#resp-protocol-description
export const dataTypePrefixes = {
  simpleString: '+',
  bulkString: '$',
  error: '-',
  integer: ':',
  array: '*',
}

export const deserialize = (serializedInput: string) => {
  if (!serializedInput.endsWith('\r\n')) {
    throw new Error(ERRORS.DESERIALIZE.MISSING_CRLF)
  }

  const typePrefix = serializedInput[0]
  const trimmedInput = serializedInput.substring(1, serializedInput.length - 2)

  switch (typePrefix) {
    case dataTypePrefixes.simpleString:
    case dataTypePrefixes.error:
      // Simple string and error have just prefix and CRLF at the end.
      return trimmedInput
    case dataTypePrefixes.integer:
      return deserializeInteger(trimmedInput)
    case dataTypePrefixes.bulkString:
      return deserializeBulkString(trimmedInput)
    case dataTypePrefixes.array:
      return deserializeArray(trimmedInput)
    default:
      throw new Error(ERRORS.DESERIALIZE.UNKOWN_PREFIX)
  }
}
