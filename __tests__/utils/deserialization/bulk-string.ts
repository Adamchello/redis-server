import { deserializeBulkString } from "../../../src/utils/deserialization/bulk-string.js"

describe("Bulk string deserialization function", () => {
    test("should throw an error when CRLF isn't passed at the end", () => {
        expect(() => {
            deserializeBulkString("$6\r\nfoobar")
        }).toThrow("Bulk String is missing CRLF")
    })

    test("should throw an error when CRLF isn't between the length and the text", () => {
        expect(() => {
            deserializeBulkString("$6foobar\r\n")
        }).toThrow("Bulk String has incorrect length")
    })

    test("should return an empty string", () => {
        const result = deserializeBulkString("$0\r\n\r\n")
        expect(result).toBe("")
    })

    test("should return null", () => {
        const result = deserializeBulkString("$-1\r\n")
        expect(result).toBe(null)
    })

    test("should return the passed text", () => {
        const result = deserializeBulkString("$12\r\nHello, World\r\n")
        expect(result).toBe("Hello, World")
    })
})