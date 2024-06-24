import { DATA_TYPE_PREFIXES, ERRORS } from '../constants.js'
import { deserialize } from './index.js'

export const deserializeArray = (input: string): (string | number)[] => {
  const [arrLength, ...arrElements] = input.split('\r\n')

  // Special variation for null
  if (arrLength === '-1' && arrElements.length === 0) {
    return null
  }

  const deserializedArray = arrElements.reduce((acc, el, i, arr) => {
    if (el === null) return acc

    if (el[0] === DATA_TYPE_PREFIXES.bulkString) {
      el += '\r\n' + `${arr[i + 1]}\r\n`
      arr[i + 1] = null
    } else {
      el += '\r\n'
    }

    if (el !== null) {
      acc.push(deserialize(el))
    }

    return acc
  }, [])

  const passedArrayLength = Number(arrLength)
  if (deserializedArray.length !== passedArrayLength || Number.isNaN(passedArrayLength)) {
    throw new Error(ERRORS.ARRAY.INCORRECT_LENGTH)
  }

  return deserializedArray
}
