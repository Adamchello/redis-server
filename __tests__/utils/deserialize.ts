import { ERRORS } from '../../src/utils/constants.js'
import { deserialize } from '../../src/utils/deserialization/index.js'

describe('Deserialize function', () => {
  describe('handles errors related to missing CRLF', () => {
    const missingSuffixInputs = [
      { input: '+OK', type: 'simple string', error: ERRORS.DESERIALIZE.MISSING_CRLF },
      { input: '-Error message', type: 'error message', error: ERRORS.DESERIALIZE.MISSING_CRLF },
      { input: '$6\r\nfoobar', type: 'bulk string', error: ERRORS.DESERIALIZE.MISSING_CRLF },
      { input: ':123', type: 'integer', error: ERRORS.DESERIALIZE.MISSING_CRLF },
      {
        input: '*2\r\n$4\r\necho\r\n$11\r\nhello world',
        type: 'array',
        error: ERRORS.DESERIALIZE.MISSING_CRLF,
      },
    ]

    test.each(missingSuffixInputs)(
      'should throw error when $type is missing CRLF',
      ({ input, error }) => {
        expect(() => deserialize(input)).toThrow(error)
      },
    )
  })

  describe('handles errors related to invalid format', () => {
    const invalidFormatInputs = [
      {
        input: '$6foobar\r\n',
        error: ERRORS.BULK_STRING.INVALID_FORMAT,
        description: 'bulk string has invalid format',
      },
      {
        input: '$\r\n\r\n',
        error: ERRORS.BULK_STRING.INVALID_FORMAT,
        description: 'bulk string is missing length and text',
      },
      {
        input: '$12\r\nfoobar\r\n',
        error: ERRORS.BULK_STRING.INCORRECT_LENGTH,
        description: 'bulk string has incorrect length',
      },
      {
        input: ':abc\r\n',
        error: ERRORS.INTEGER.INVALID_NUMBER,
        description: 'integer is non-numeric value',
      },
      {
        input: '*12\r\n$4\r\necho\r\n$11\r\nhello world\r\n',
        error: ERRORS.ARRAY.INCORRECT_LENGTH,
        description: 'array has incorrect length',
      },
      {
        input: '?Test\r\n',
        error: ERRORS.DESERIALIZE.UNKOWN_PREFIX,
        description: 'unknown type prefix is passed',
      },
    ]

    test.each(invalidFormatInputs)('should throw error when $description', ({ input, error }) => {
      expect(() => deserialize(input)).toThrow(error)
    })
  })

  describe('handles deserialization for empty and null values', () => {
    const emptyFormatInputs = [
      { input: '+\r\n', expected: '', description: 'an empty simple string' },
      { input: '-\r\n', expected: '', description: 'an empty error' },
      { input: '$0\r\n\r\n', expected: '', description: 'an empty bulk string' },
      { input: '$-1\r\n', expected: null, description: 'a bulk string with length -1' },
      { input: '*-1\r\n', expected: null, description: 'an array with length -1' },
    ]

    test.each(emptyFormatInputs)('parses $description correctly', ({ input, expected }) => {
      expect(deserialize(input)).toEqual(expected)
    })
  })

  describe('handles deserialization for various valid input types', () => {
    const validInputs = [
      { input: '+OK\r\n', expected: 'OK', type: 'a simple string' },
      { input: '-Error message\r\n', expected: 'Error message', type: 'an error message' },
      { input: '$12\r\nHello, World\r\n', expected: 'Hello, World', type: 'a bulk string' },
      { input: ':152351\r\n', expected: 152351, type: 'an integer' },
      {
        input: '*2\r\n$4\r\necho\r\n$11\r\nhello world\r\n',
        expected: ['echo', 'hello world'],
        type: 'an array',
      },
      {
        input: '*3\r\n$12\r\nHello, World\r\n:16\r\n+OK\r\n',
        expected: ['Hello, World', 16, 'OK'],
        type: 'an array with mixed types',
      },
    ]

    test.each(validInputs)('parses $type correctly', ({ input, expected }) => {
      expect(deserialize(input)).toEqual(expected)
    })
  })
})
