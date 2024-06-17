export const deserializeBulkString = (trimmedInput: string) => {
    const [textLength, text] = trimmedInput.split("\r\n")
    const passedTextLength = Number(textLength)

    // Special variation for null
    if (passedTextLength === -1 && text === undefined) return null

    if (text === undefined || (textLength.length === 0 && text.length === 0)) {
        throw new Error("Invalid bulk string format")
    }

    if (passedTextLength !== text.length || Number.isNaN(passedTextLength)) {
        throw new Error("Bulk string has incorrect length")
    }

    return text
}