import { deserializeArray } from "./array.js"
import { deserializeBulkString } from "./bulk-string.js"
import { deserializeInteger } from "./integer.js"

// https://redis.io/docs/latest/develop/reference/protocol-spec/#resp-protocol-description
export const respDataTypes = {
    simpleString: "+",
    bulkString: "$",
    error: "-",
    integer: ":",
    array: "*"
}

export const deserialize = (serializedInput: string) => {
    if (!serializedInput.endsWith("\r\n")) {
        throw new Error("Serialized input is missing CRLF")
    }
    
    const typePrefix = serializedInput[0]
    const trimmedInput = serializedInput.substring(1, serializedInput.length - 2)

    switch (typePrefix) {
        case respDataTypes.simpleString:
        case respDataTypes.error:
            // Simple string and error have just prefix and CRLF at the end.
            return trimmedInput
        case respDataTypes.integer:
            return deserializeInteger(trimmedInput)
        case respDataTypes.bulkString:
            return deserializeBulkString(trimmedInput)
        case respDataTypes.array:
            return deserializeArray(trimmedInput)
        default:
            throw new Error("Unkown type prefix")
    }
}