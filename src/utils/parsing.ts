export const parseInputValue = (inputValue: string) => {
  try {
    const parsedValue = JSON.parse(inputValue)
    if (Array.isArray(parsedValue)) {
      return parsedValue
    }
  } catch {
    // If JSON.parse throws an error, we proceed to check if the input is a number
  }

  const numericValue = Number(inputValue)
  if (!Number.isNaN(numericValue)) {
    return numericValue
  }

  return inputValue
}
