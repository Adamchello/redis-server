import { deserialize } from "../../src/utils/deserialization/index.js"

describe("Deserialize function", () => {
    describe("Simple string deserialization", () => {
        test("should throw an error when CRLF isn't passed at the end", () => {
            expect(() => {
                deserialize("+OK")
            }).toThrow("Serialized input is missing CRLF")
        })
    
        test("should parse an empty simple string", () => {
            const result = deserialize("+\r\n")
            expect(result).toBe("")
        })
    
        test("should parse a simple string", () => {
            const result = deserialize("+OK\r\n")
            expect(result).toBe("OK")
        })
    })

    describe("Bulk string deserialization", () => {
        test("should throw an error when CRLF isn't passed at the end", () => {
            expect(() => {
                deserialize( "$6\r\nfoobar")
            }).toThrow("Serialized input is missing CRLF")
        })
    
        test("should throw an error when bulk string has incorrect format", () => {
            expect(() => {
                deserialize("$6foobar\r\n")
            }).toThrow("Invalid bulk string format")
        })
    
        test("should throw an error when CRLF isn't between the length and the text", () => {
            expect(() => {
                deserialize("$12\r\nfoobar\r\n")
            }).toThrow("Bulk string has incorrect length")
        })

        test("should return null for bulk string with passed length -1", () => {
            const result = deserialize("$-1\r\n")
            expect(result).toBe(null)
        })
    
        test("should parse an empty bulk string", () => {
            const result = deserialize("$0\r\n\r\n")
            expect(result).toBe("")
        })
    
        test("should parse a bulk string", () => {
            const result = deserialize("$12\r\nHello, World\r\n")
            expect(result).toBe("Hello, World")
        })
    })
    
    test("should throw an error when unknown type is passed", () => {
        expect(() => {
            deserialize("?Test\r\n")
        }).toThrow("Unkown type prefix")
    })
})
