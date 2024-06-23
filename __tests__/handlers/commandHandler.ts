import { handleCommand } from '../../src/handlers/commandHandler.js'
import { ERRORS } from '../../src/utils/constants.js'
import { serialize } from '../../src/utils/serialization.js'

describe('HandleCommand function', () => {
  let socket

  beforeEach(() => {
    socket = {
      write: jest.fn(),
    }
  })

  it('should respond with error for unknown command', () => {
    handleCommand(['UNKNOWN'], socket)
    expect(socket.write).toHaveBeenCalledWith(serialize(ERRORS.COMMAND.UNKNOWN, 'error'))
  })

  it('should respond with error for empty command', () => {
    handleCommand([], socket)
    expect(socket.write).toHaveBeenCalledWith(serialize(ERRORS.COMMAND.UNKNOWN, 'error'))
  })

  it('should respond with error for ECHO without argument', () => {
    handleCommand(['ECHO'], socket)
    expect(socket.write).toHaveBeenCalledWith(
      serialize(ERRORS.COMMAND.MISSING_ECHO_ARGUMENT, 'error'),
    )
  })

  it('should respond with PONG to PING command', () => {
    handleCommand(['PING'], socket)
    const pingResult = serialize('PONG', 'simpleString')

    expect(socket.write).toHaveBeenCalledWith(pingResult)
  })

  it('should respond with bulkString to ECHO command', () => {
    const inputText = 'Hello world'

    handleCommand(['ECHO', inputText], socket)
    const echoResult = serialize(inputText, 'bulkString')

    expect(socket.write).toHaveBeenCalledWith(echoResult)
  })
})
