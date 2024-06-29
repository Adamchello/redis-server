import { serialize } from '../utils/serialization.js'

export function handlePing() {
  return serialize('PONG', 'simpleString')
}
