import net from 'net'
import { serialize } from '../utils/serialization.js'
import { ERRORS } from '../utils/constants.js'
import { commandRegistry } from '../commands/commandRegistry.js'
import { RedisStore } from '../services/RedisStore.js'

export function handleCommand(commands: string[], socket: net.Socket) {
  if (!Array.isArray(commands) || commands.length === 0) {
    socket.write(serialize(ERRORS.COMMAND.UNKNOWN, 'error'))
    return
  }

  const [command, ...args] = commands
  const handleFunction = commandRegistry[command.toUpperCase()]

  if (!handleFunction) {
    socket.write(serialize(ERRORS.COMMAND.UNKNOWN, 'error'))
    return
  }

  const redisStore = RedisStore.getInstance()
  const result = handleFunction(args, redisStore)
  socket.write(result)
}
