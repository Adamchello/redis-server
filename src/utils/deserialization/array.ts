import { deserialize, respDataTypes } from "./index.js"

export const deserializeArray = (trimmedInput: string) => {
    const [arrLength, ...arrElements] = trimmedInput.split("\r\n");

    // Special variation for null
    if (arrLength === "-1" && arrElements.length === 0) {
        return null
    }

    const passedArrayLength = Number(arrLength)
    const deserializedArray = [];

    for (let i = 0; i < arrElements.length; i++) {
        let el = arrElements[i];

        if (el[0] === respDataTypes.bulkString) {
            el += "\r\n" + `${arrElements[++i]}\r\n`;
        } else {
            el += "\r\n";
        }

        deserializedArray.push(deserialize(el));
    }

    if (deserializedArray.length !== passedArrayLength || Number.isNaN(passedArrayLength)) {
        throw new Error("Array has incorrect length");
    }

    return deserializedArray
}