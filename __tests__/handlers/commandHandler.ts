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

  it('should answer the unknown command with error', () => {
    handleCommand(['UNKNOWN'], socket)
    expect(socket.write).toHaveBeenCalledWith(serialize(ERRORS.COMMAND.UNKNOWN, 'error'))
  })

  it('should answer the empty command with error', () => {
    handleCommand([], socket)
    expect(socket.write).toHaveBeenCalledWith(serialize(ERRORS.COMMAND.UNKNOWN, 'error'))
  })

  it('should answer the ECHO command without argument with error', () => {
    handleCommand(['ECHO'], socket)
    expect(socket.write).toHaveBeenCalledWith(
      serialize(ERRORS.COMMAND.MISSING_ECHO_ARGUMENT, 'error'),
    )
  })

  it('should answer the PING command with PONG response', () => {
    handleCommand(['PING'], socket)
    const pingResult = serialize('PONG', 'simpleString')

    expect(socket.write).toHaveBeenCalledWith(pingResult)
  })

  it('should answer the ECHO command with bulkString response', () => {
    const inputText = 'Hello world'

    handleCommand(['ECHO', inputText], socket)
    const echoResult = serialize(inputText, 'bulkString')

    expect(socket.write).toHaveBeenCalledWith(echoResult)
  })

  it('should answer the SET command with missing arguments error', () => {
    handleCommand(['SET', 'key'], socket)
    expect(socket.write).toHaveBeenCalledWith(
      serialize(ERRORS.COMMAND.MISSING_SET_ARGUMENTS, 'error'),
    )
  })

  it('should answer the SET command with OK response', () => {
    handleCommand(['SET', 'key', 'value'], socket)
    const setResult = serialize('OK', 'simpleString')

    expect(socket.write).toHaveBeenCalledWith(setResult)
  })

  it('should answer the GET command with missing argument error', () => {
    handleCommand(['GET'], socket)
    expect(socket.write).toHaveBeenCalledWith(
      serialize(ERRORS.COMMAND.MISSING_GET_ARGUMENT, 'error'),
    )
  })

  it('should answer the GET command with key not found error if key does not exist', () => {
    handleCommand(['GET', 'keyyy'], socket)
    expect(socket.write).toHaveBeenCalledWith(serialize(ERRORS.COMMAND.GET_KEY_NOT_FOUND, 'error'))
  })

  it('should answer the GET command with bulkString response if key exists', () => {
    handleCommand(['SET', 'name', 'John'], socket)
    const setResult = serialize('OK', 'simpleString')

    expect(socket.write).toHaveBeenCalledWith(setResult)

    handleCommand(['GET', 'name'], socket)
    const getResult = serialize('John', 'bulkString')

    expect(socket.write).toHaveBeenCalledWith(getResult)
  })
})
