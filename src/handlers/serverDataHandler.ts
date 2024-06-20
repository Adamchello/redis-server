import net from 'net'
import { serialize } from '../utils/serialization.js'
import { deserialize } from '../utils/deserialization/index.js'
import { handleCommand } from './commandHandler.js'
import { ERRORS } from '../utils/constans.js'

export function onData(data: Buffer, socket: net.Socket) {
  try {
    const commands = deserialize(data.toString()) as string[]
    handleCommand(commands, socket)
  } catch (error) {
    socket.write(serialize(ERRORS.COMMAND.PROCESSING, 'error'))
  }
}
