import { ERRORS } from '../../src/utils/constants.js'
import { deserialize } from '../../src/utils/deserialization/index.js'

describe('Deserialize function', () => {
  describe('Simple string deserialization', () => {
    test("should throw an error when CRLF isn't passed at the end", () => {
      const simpleStringWithoutCRLFSuffix = '+OK'

      expect(() => {
        deserialize(simpleStringWithoutCRLFSuffix)
      }).toThrow(ERRORS.DESERIALIZE.MISSING_CRLF)
    })

    test('should parse an empty simple string', () => {
      const result = deserialize('+\r\n')
      expect(result).toBe('')
    })

    test('should parse a simple string', () => {
      const result = deserialize('+OK\r\n')
      expect(result).toBe('OK')
    })
  })

  describe('Error deserialization', () => {
    test("should throw an error when CRLF isn't passed at the end", () => {
      const errorWithoutCRLFSuffix = '-Error message'

      expect(() => {
        deserialize(errorWithoutCRLFSuffix)
      }).toThrow(ERRORS.DESERIALIZE.MISSING_CRLF)
    })

    test('should parse an empty error', () => {
      const result = deserialize('-\r\n')
      expect(result).toBe('')
    })

    test('should parse a error', () => {
      const result = deserialize('-Error message\r\n')
      expect(result).toBe('Error message')
    })
  })

  describe('Bulk string deserialization', () => {
    test("should throw an error when CRLF isn't passed at the end", () => {
      const bulkStringWithoutCRLFSuffix = '$6\r\nfoobar'

      expect(() => {
        deserialize(bulkStringWithoutCRLFSuffix)
      }).toThrow(ERRORS.DESERIALIZE.MISSING_CRLF)
    })

    test('should throw an error when bulk string has incorrect format', () => {
      const bulkStringMissingCRLFAfterTextLength = '$6foobar\r\n'
      const bulkStringMissingLengthAndText = '$\r\n\r\n'

      expect(() => {
        deserialize(bulkStringMissingCRLFAfterTextLength)
      }).toThrow(ERRORS.BULK_STRING.INVALID_FORMAT)

      expect(() => {
        deserialize(bulkStringMissingLengthAndText)
      }).toThrow(ERRORS.BULK_STRING.INVALID_FORMAT)
    })

    test("should throw an error when CRLF isn't between the length and the text", () => {
      const bulkStringWithIncorrectLength = '$12\r\nfoobar\r\n'

      expect(() => {
        deserialize(bulkStringWithIncorrectLength)
      }).toThrow(ERRORS.BULK_STRING.INCORRECT_LENGTH)
    })

    test('should return null for bulk string with passed length -1', () => {
      const result = deserialize('$-1\r\n')
      expect(result).toBe(null)
    })

    test('should parse an empty bulk string', () => {
      const result = deserialize('$0\r\n\r\n')
      expect(result).toBe('')
    })

    test('should parse a bulk string', () => {
      const result = deserialize('$12\r\nHello, World\r\n')
      expect(result).toBe('Hello, World')
    })
  })

  describe('Integer deserialization', () => {
    test("should throw an error when CRLF isn't passed at the end", () => {
      const integerWithoutCRLFSuffix = ':123'

      expect(() => {
        deserialize(integerWithoutCRLFSuffix)
      }).toThrow(ERRORS.DESERIALIZE.MISSING_CRLF)
    })

    test("should throw an error when input isn't number", () => {
      const nonNumericIntegerValue = ':abc\r\n'

      expect(() => {
        deserialize(nonNumericIntegerValue)
      }).toThrow(ERRORS.INTEGER.INVALID_NUMBER)
    })

    test('should parse a number', () => {
      const result = deserialize(':152351\r\n')
      expect(result).toBe(152351)
    })
  })

  describe('Array deserialization', () => {
    test("should throw an error when CRLF isn't passed at the end", () => {
      const arrayWithoutCRLFSuffix = '*2\r\n$4\r\necho\r\n$11\r\nhello world'

      expect(() => {
        deserialize(arrayWithoutCRLFSuffix)
      }).toThrow(ERRORS.DESERIALIZE.MISSING_CRLF)
    })

    test('should throw an error when array length is incorrect', () => {
      const arrayWithIncorrectLength = '*12\r\n$4\r\necho\r\n$11\r\nhello world\r\n'

      expect(() => {
        deserialize(arrayWithIncorrectLength)
      }).toThrow(ERRORS.ARRAY.INCORRECT_LENGTH)
    })

    test('should return null for array with passed length -1', () => {
      const result = deserialize('*-1\r\n')
      expect(result).toBe(null)
    })

    test('should parse an array', () => {
      const result = deserialize('*2\r\n$4\r\necho\r\n$11\r\nhello world\r\n')
      expect(result).toEqual(['echo', 'hello world'])
    })

    test('should parse an array with mixed elements types', () => {
      const result = deserialize('*3\r\n$12\r\nHello, World\r\n:16\r\n+OK\r\n')
      expect(result).toEqual(['Hello, World', 16, 'OK'])
    })
  })

  test('should throw an error when unknown type is passed', () => {
    const unkownPrefixInput = '?Test\r\n'

    expect(() => {
      deserialize(unkownPrefixInput)
    }).toThrow(ERRORS.DESERIALIZE.UNKOWN_PREFIX)
  })
})
