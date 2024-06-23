import { ERRORS } from '../constants.js'

export const deserializeInteger = (input: string): number => {
  const inputNumber = Number(input)

  if (Number.isNaN(inputNumber)) {
    throw new Error(ERRORS.INTEGER.INVALID_NUMBER)
  }

  return inputNumber
}
