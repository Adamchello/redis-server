import net from 'net'
import { serialize } from '../utils/serialization.js'
import { COMMANDS, ERRORS } from '../utils/constants.js'

export function handleCommand(commands: string[], socket: net.Socket) {
  if (!Array.isArray(commands) || commands.length === 0) {
    socket.write(serialize(ERRORS.COMMAND.UNKNOWN, 'error'))
    return
  }

  const command = commands[0].toUpperCase()

  switch (command) {
    case COMMANDS.PING:
      socket.write(serialize('PONG', 'simpleString'))
      break
    case COMMANDS.ECHO:
      if (commands.length > 1) {
        socket.write(serialize(commands[1], 'bulkString'))
      } else {
        socket.write(serialize(ERRORS.COMMAND.MISSING_ECHO_ARGUMENT, 'error'))
      }
      break
    default:
      socket.write(serialize(ERRORS.COMMAND.UNKNOWN, 'error'))
  }
}
