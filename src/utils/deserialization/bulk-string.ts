import { ERRORS } from '../constants.js'

export const deserializeBulkString = (input: string): string => {
  const [textLength, text] = input.split('\r\n')
  const passedTextLength = Number(textLength)

  // Special variation for null
  if (passedTextLength === -1 && text === undefined) return null

  if (text === undefined || (textLength.length === 0 && text.length === 0)) {
    throw new Error(ERRORS.BULK_STRING.INVALID_FORMAT)
  }

  if (passedTextLength !== text.length || Number.isNaN(passedTextLength)) {
    throw new Error(ERRORS.BULK_STRING.INCORRECT_LENGTH)
  }

  return text
}
