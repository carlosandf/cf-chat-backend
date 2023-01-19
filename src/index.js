const http = require('http')
const { Server } = require('socket.io')
const app = require('./app')
const sockets = require('./sockets')
const { PORT } = require('./utils/config')


const server = http.createServer(app)

const io = new Server(server, { cors: { origin: '*' } })

sockets(io)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log('server')
})

module.exports = { server }