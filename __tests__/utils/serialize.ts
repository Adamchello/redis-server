import { RESP_VALUE_TYPES } from '../../src/types/respTypes.js'
import { ERRORS } from '../../src/utils/constants.js'
import { serialize } from '../../src/utils/serialization.js'

describe('Serialize function', () => {
  describe('Type and value validation', () => {
    const invalidInputs = [
      { input: 5, type: 'simpleString', error: ERRORS.SERIALIZE.INVALID_SIMPLE_STRING_VALUE },
      { input: 5, type: 'error', error: ERRORS.SERIALIZE.INVALID_ERROR_VALUE },
      { input: 5, type: 'bulkString', error: ERRORS.SERIALIZE.INVALID_BULK_STRING_VALUE },
      { input: 'abc', type: 'integer', error: ERRORS.SERIALIZE.INVALID_INTEGER_VALUE },
      { input: 'abc', type: 'array', error: ERRORS.SERIALIZE.INVALID_ARRAY_VALUE },
      { input: 'test', type: 'unknown', error: ERRORS.SERIALIZE.UNKNOWN_TYPE },
    ]

    test.each(invalidInputs)(
      'should throw error for invalid $type input',
      ({ input, type, error }) => {
        expect(() => serialize(input, type as keyof RESP_VALUE_TYPES)).toThrow(error)
      },
    )
  })

  describe('Output validation', () => {
    const validInputs = [
      { input: 'OK', type: 'simpleString', expected: '+OK\r\n' },
      { input: 'Error message', type: 'error', expected: '-Error message\r\n' },
      { input: 'Hello, World', type: 'bulkString', expected: '$12\r\nHello, World\r\n' },
      { input: 152351, type: 'integer', expected: ':152351\r\n' },
      {
        input: ['Hello, World', 16, 'OK'],
        type: 'array',
        expected: '*3\r\n$12\r\nHello, World\r\n:16\r\n$2\r\nOK\r\n',
      },
    ]

    test.each(validInputs)('should correctly serialize $type', ({ input, type, expected }) => {
      const result = serialize(input, type as keyof RESP_VALUE_TYPES)
      expect(result).toBe(expected)
    })
  })
})
