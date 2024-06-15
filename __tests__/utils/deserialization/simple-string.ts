import { deserializeSimpleString } from "../../../src/utils/deserialization/simple-string.js"

describe("Simple string deserialization function", () => {
    test("should throw error when CRLF isn't passed at the end", () => {
        expect(() => {
            deserializeSimpleString("+OK")
        }).toThrow("Simple String is missing CRLF")
    })

    test("should return an empty string", () => {
        const result = deserializeSimpleString("+\r\n")
        expect(result).toBe("")
    })

    test("should return the passed text", () => {
        const result = deserializeSimpleString("+OK\r\n")
        expect(result).toBe("OK")
    })
}) 