import { onData } from '../../src/handlers/serverDataHandler.js'
import { ERRORS } from '../../src/utils/constants.js'
import { serialize } from '../../src/utils/serialization.js'

describe('ServerDataHandler function', () => {
  let socket

  beforeEach(() => {
    socket = {
      write: jest.fn(),
    }
  })

  it('should respond with PONG for PING command', () => {
    const bufferData = Buffer.from('*1\r\n$4\r\nPING\r\n')
    onData(bufferData, socket)

    const pingResult = serialize('PONG', 'simpleString')
    expect(socket.write).toHaveBeenCalledWith(pingResult)
  })

  it('should respond with error for empty data', () => {
    const bufferData = Buffer.from('')
    onData(bufferData, socket)

    expect(socket.write).toHaveBeenCalledWith(`-${ERRORS.COMMAND.PROCESSING}\r\n`)
  })
})
