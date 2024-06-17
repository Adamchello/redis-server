import { deserializeBulkString } from "./bulk-string.js"

// https://redis.io/docs/latest/develop/reference/protocol-spec/#resp-protocol-description
const respDataTypes = {
    simpleString: "+",
    bulkString: "$"
}

export const deserialize = (serializedInput: string) => {
    if (!serializedInput.endsWith("\r\n")) {
        throw new Error("Serialized input is missing CRLF")
    }
    
    const typePrefix = serializedInput[0]
    const trimmedInput = serializedInput.substring(1, serializedInput.length - 2)

    switch (typePrefix) {
        case respDataTypes.simpleString:
            // Simple string has just prefix and CRLF at the end.
            return trimmedInput
        case respDataTypes.bulkString:
            return deserializeBulkString(trimmedInput)
        default:
            throw new Error("Unkown type prefix")
    }
}