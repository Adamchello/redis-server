import { DATA_TYPE_PREFIXES, ERRORS } from '../constans.js'
import { deserializeArray } from './array.js'
import { deserializeBulkString } from './bulk-string.js'
import { deserializeInteger } from './integer.js'

export const deserialize = (serializedInput: string) => {
  if (!serializedInput.endsWith('\r\n')) {
    throw new Error(ERRORS.DESERIALIZE.MISSING_CRLF)
  }

  const typePrefix = serializedInput[0]
  const trimmedInput = serializedInput.substring(1, serializedInput.length - 2)

  switch (typePrefix) {
    case DATA_TYPE_PREFIXES.simpleString:
    case DATA_TYPE_PREFIXES.error:
      // Simple string and error have just prefix and CRLF at the end.
      return trimmedInput
    case DATA_TYPE_PREFIXES.integer:
      return deserializeInteger(trimmedInput)
    case DATA_TYPE_PREFIXES.bulkString:
      return deserializeBulkString(trimmedInput)
    case DATA_TYPE_PREFIXES.array:
      return deserializeArray(trimmedInput)
    default:
      throw new Error(ERRORS.DESERIALIZE.UNKOWN_PREFIX)
  }
}
