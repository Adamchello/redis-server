/* eslint-disable @typescript-eslint/no-explicit-any */

import { ERRORS } from '../../src/utils/constants.js'
import { serialize } from '../../src/utils/serialization.js'

describe('Serialize function', () => {
  describe('Simple string serialization', () => {
    test("should throw an error when the type of input isn't string", () => {
      const invalidSimpleStringValue: any = 5

      expect(() => {
        serialize(invalidSimpleStringValue, 'simpleString')
      }).toThrow(ERRORS.SERIALIZE.INVALID_SIMPLE_STRING_VALUE)
    })

    test('should parse input to a simple string', () => {
      const result = serialize('OK', 'simpleString')
      expect(result).toBe('+OK\r\n')
    })
  })

  describe('Error serialization', () => {
    test("should throw an error when the type of input isn't string", () => {
      const invalidErrorValue: any = 5

      expect(() => {
        serialize(invalidErrorValue, 'error')
      }).toThrow(ERRORS.SERIALIZE.INVALID_ERROR_VALUE)
    })

    test('should parse input to an error', () => {
      const result = serialize('Error message', 'error')
      expect(result).toBe('-Error message\r\n')
    })
  })

  describe('Bulk string serialization', () => {
    test("should throw an error when the type of input isn't string", () => {
      const invalidBulkStringValue: any = 5

      expect(() => {
        serialize(invalidBulkStringValue, 'bulkString')
      }).toThrow(ERRORS.SERIALIZE.INVALID_BULK_STRING_VALUE)
    })

    test('should parse input to a bulk string', () => {
      const result = serialize('Hello, World', 'bulkString')
      expect(result).toBe('$12\r\nHello, World\r\n')
    })
  })

  describe('Integer serialization', () => {
    test("should throw an error when the type of input isn't number", () => {
      const invalidIntegerValue: any = 'abc'

      expect(() => {
        serialize(invalidIntegerValue, 'integer')
      }).toThrow(ERRORS.SERIALIZE.INVALID_INTEGER_VALUE)
    })

    test('should parse input to an integer', () => {
      const result = serialize(152351, 'integer')
      expect(result).toBe(':152351\r\n')
    })
  })

  describe('Array serialization', () => {
    test("should throw an error when the type of input isn't array", () => {
      const invalidArrayValue: any = 'abc'

      expect(() => {
        serialize(invalidArrayValue, 'array')
      }).toThrow(ERRORS.SERIALIZE.INVALID_ARRAY_VALUE)
    })

    test('should parse input to an array', () => {
      const result = serialize(['Hello, World', 16, 'OK'], 'array')
      expect(result).toBe('*3\r\n$12\r\nHello, World\r\n:16\r\n$2\r\nOK\r\n')
    })
  })

  test('should throw an error when an unknown type is passed', () => {
    const unknownInputType: any = 'test'

    expect(() => {
      serialize('test', unknownInputType)
    }).toThrow(ERRORS.SERIALIZE.UNKNOWN_TYPE)
  })
})
