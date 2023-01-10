const http = require('http')
//const { Server: WebSocketServer } = require('socket.io')
const app = require('./app')
// const sockets = require('./sockets')
const { PORT } = require('./utils/config')


const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// const io = new WebSocketServer(httpServer, { cors: { origin: '*' } })

// sockets(io)

module.exports = { server }