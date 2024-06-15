import { deserializeValue } from "../../../src/utils/deserialization/index.js"

describe("Value deserialization function", () => {
    test("should throw an error when an unknown type is passed", () => {
        expect(() => {
            deserializeValue("?-1\r\n")
        }).toThrow("Unknown type prefix")
    })

    test("should return a deserialized simple string", () => {
        const result = deserializeValue("+OK\r\n")
        expect(result).toBe("OK")
    })

    test("should return a deserialized bulk string", () => {
        const result = deserializeValue("$12\r\nHello, World\r\n")
        expect(result).toBe("Hello, World")
    })
})