export const ERRORS = {
  DESERIALIZE: {
    MISSING_CRLF: 'Serialized input is missing CRLF',
    UNKOWN_PREFIX: 'Unkown type prefix',
  },
  SERIALIZE: {
    INVALID_SIMPLE_STRING_VALUE: 'Value must be a string for simpleString type',
    INVALID_ERROR_VALUE: 'Value must be a string for error type',
    INVALID_BULK_STRING_VALUE: 'Value must be a string for bulkString type',
    INVALID_INTEGER_VALUE: 'Value must be a number for integer type',
    INVALID_ARRAY_VALUE: 'Value must be an array for array type',
    UNKNOWN_TYPE: 'Unkown value type',
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
  COMMAND: {
    UNKNOWN: 'Unknown command',
    MISSING_ECHO_ARGUMENT: 'Missing argument for ECHO',
    MISSING_SET_ARGUMENTS: 'Missing key and value for SET',
    INVALID_SET_EXPIRY_TYPE: 'Invalid expiry type for SET',
    INVALID_SET_EXPIRY_VALUE: 'Invalid expiry value for SET',
    MISSING_GET_ARGUMENT: 'Missing argument for GET',
    GET_KEY_NOT_FOUND: 'Passed key do not exist in store',
    PROCESSING: 'Error processing command',
  },
}

// https://redis.io/docs/latest/develop/reference/protocol-spec/#resp-protocol-description
export const DATA_TYPE_PREFIXES = {
  simpleString: '+',
  bulkString: '$',
  error: '-',
  integer: ':',
  array: '*',
}

export const COMMANDS = {
  PING: 'PING',
  ECHO: 'ECHO',
  SET: 'SET',
  GET: 'GET',
}
