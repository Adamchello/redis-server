export const deserializeSimpleString = (value: string) => {
    if (!value.endsWith("\r\n")) {
        throw new Error("Simple String is missing CRLF")
    }
    return value.substring(1, value.length - 2)
}