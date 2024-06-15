export const deserializeBulkString = (value: string) => {
    if (!value.endsWith("\r\n")) {
        throw new Error("Bulk String is missing CRLF")
    }

    const [textLength, text] = value.substring(1).split("\r\n")

    if (Number(textLength) === -1 && text.length === 0) return null

    if (Number(textLength) !== text.length) {
        throw new Error("Bulk String has incorrect length")
    }

    return text.substring(0, value.length - 2)
}