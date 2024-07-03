import { serialize } from '../utils/serialization.js'
import { ERRORS } from '../utils/constants.js'

export function handleEcho(args: string[]) {
  if (args.length !== 1) {
    return serialize(ERRORS.COMMAND.MISSING_ECHO_ARGUMENT, 'error')
  }

  return serialize(args[0], 'bulkString')
}
