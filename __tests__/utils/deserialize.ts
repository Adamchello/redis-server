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

    describe("Error deserialization", () => {
        test("should throw an error when CRLF isn't passed at the end", () => {
            expect(() => {
                deserialize("-Error message")
            }).toThrow("Serialized input is missing CRLF")
        })
    
        test("should parse an empty error", () => {
            const result = deserialize("-\r\n")
            expect(result).toBe("")
        })
    
        test("should parse a error", () => {
            const result = deserialize("-Error message\r\n")
            expect(result).toBe("Error message")
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

            expect(() => {
                deserialize("$\r\n\r\n")
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

    describe("Integer deserialization", () => {
        test("should throw an error when CRLF isn't passed at the end", () => {
            expect(() => {
                deserialize(":123")
            }).toThrow("Serialized input is missing CRLF")
        })
    
        test("should throw an error when input isn't number", () => {
            expect(() => {
                deserialize(":abc\r\n")
            }).toThrow("Integer isn't valid number")
        })
    
        test("should parse a number", () => {
            const result = deserialize(":152351\r\n")
            expect(result).toBe(152351)
        })
    })

    describe("Array deserialization", () => {
        test("should throw an error when CRLF isn't passed at the end", () => {
            expect(() => {
                deserialize("*2\r\n$4\r\necho\r\n$11\r\nhello world")
            }).toThrow("Serialized input is missing CRLF")
        })
    
        test("should throw an error when CRLF isn't between the length and the array elements", () => {
            expect(() => {
                deserialize("*12\r\n$4\r\necho\r\n$11\r\nhello world\r\n")
            }).toThrow("Array has incorrect length")
        })

        test("should return null for array with passed length -1", () => {
            const result = deserialize("*-1\r\n")
            expect(result).toBe(null)
        })
    
        test("should parse an array", () => {
            const result = deserialize("*2\r\n$4\r\necho\r\n$11\r\nhello world\r\n")
            expect(result).toEqual(["echo", "hello world"])
        })
    
        test("should parse an array with mixed elements types", () => {
            const result = deserialize("*3\r\n$12\r\nHello, World\r\n:16\r\n+OK\r\n")
            expect(result).toEqual(["Hello, World", 16, "OK"])
        })
    })
    
    test("should throw an error when unknown type is passed", () => {
        expect(() => {
            deserialize("?Test\r\n")
        }).toThrow("Unkown type prefix")
    })
})
