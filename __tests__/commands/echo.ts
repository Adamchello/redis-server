import { handleEcho } from '../../src/commands/echo.js'
import { ERRORS } from '../../src/utils/constants.js'
import { serialize } from '../../src/utils/serialization.js'

describe('Echo command function', () => {
  it('should answer with error without an argument', () => {
    const result = handleEcho([])

    expect(result).toBe(serialize(ERRORS.COMMAND.MISSING_ECHO_ARGUMENT, 'error'))
  })

  it('should with bulkString response', () => {
    const inputText = 'Hello world'

    const result = handleEcho([inputText])
    const expectedResult = serialize(inputText, 'bulkString')

    expect(result).toBe(expectedResult)
  })
})
