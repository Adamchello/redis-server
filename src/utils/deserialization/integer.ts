export const deserializeInteger = (trimmedInput: string) => {
    const inputNumber = Number(trimmedInput)

    if (Number.isNaN(inputNumber)) {
        throw new Error("Integer isn't valid number")
    }

    return inputNumber
}