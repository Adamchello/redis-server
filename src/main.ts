import net from 'net'
import { onData } from './handlers/serverDataHandler.js'

const REDIS_PORT = 6379

const server = net.createServer((socket) => {
  socket.on('data', (data) => onData(data, socket))
  socket.on('error', (error) => {
    console.error('Socket error:', error)
  })
})

server.listen(REDIS_PORT, () => {
  console.log(`Server started, listening on port ${REDIS_PORT}`)
})
