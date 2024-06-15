import { deserializeBulkString } from "./bulk-string.js"
import { deserializeSimpleString } from "./simple-string.js"

export const deserializeValue = (value: string) => {
    switch (value[0]) {
        case "+":
            return deserializeSimpleString(value)
        case "$":
            return deserializeBulkString(value)
        default:
            throw new Error("Unkown type prefix")
    }
}