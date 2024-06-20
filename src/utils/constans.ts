export const ERRORS = {
  DESERIALIZE: {
    MISSING_CRLF: 'Serialized input is missing CRLF',
    UNKOWN_PREFIX: 'Unkown type prefix',
  },
  BULK_STRING: {
    INVALID_FORMAT: 'Invalid bulk string format',
    INCORRECT_LENGTH: 'Bulk string has incorrect length',
  },
  INTEGER: {
    INVALID_NUMBER: "Integer isn't valid number",
  },
  ARRAY: {
    INCORRECT_LENGTH: 'Array has incorrect length',
  },
}
