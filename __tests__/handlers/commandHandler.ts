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

  it('should answer the PING command with PONG response', () => {
    handleCommand(['PING'], socket)
    const pingResult = serialize('PONG', 'simpleString')

    expect(socket.write).toHaveBeenCalledWith(pingResult)
  })
})
