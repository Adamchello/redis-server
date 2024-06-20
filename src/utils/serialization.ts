import { RESP_VALUE_TYPES } from '../types/respTypes.js'
import { ERRORS } from './constans.js'

export const serialize = <T extends keyof RESP_VALUE_TYPES>(
  value: RESP_VALUE_TYPES[T],
  valueType: T,
) => {
  switch (valueType) {
    case 'simpleString':
      return `+${value}\r\n`
    case 'error':
      return `-${value}\r\n`
    case 'bulkString':
      if (typeof value !== 'string') {
        throw new Error(ERRORS.SERIALIZE.INVALID_BULK_STRING_VALUE)
      }
      return `$${value.length}\r\n${value}\r\n`
    case 'integer':
      if (typeof value !== 'number') {
        throw new Error(ERRORS.SERIALIZE.INVALID_INTEGER_VALUE)
      }
      return `:${value}\r\n`
    case 'array':
      if (!Array.isArray(value)) {
        throw new Error(ERRORS.SERIALIZE.INVALID_ARRAY_VALUE)
      }

      return (
        `*${value.length}\r\n` +
        value
          .map((v) => {
            if (typeof v === 'number') {
              return `:${v}\r\n`
            }
            return `$${v.length}\r\n${v}\r\n`
          })
          .join('')
      )
    default:
      throw new Error(ERRORS.SERIALIZE.UNKNOWN_TYPE)
  }
}
