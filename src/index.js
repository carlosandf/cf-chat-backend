
const http = require('http')
const { Server: WebSocketServer } = require('socket.io')
const app = require('./app')
const connectDB = require('./connectDB')
const { PORT } = require('./utils/config')

connectDB() // connect to mongoDB

const server = http.createServer(app)
const httpServer = server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const io = new WebSocketServer(httpServer, { cors: { origin: '*' } })

const NEW_MESSAGE = 'newMessage'

io.on('connection', (socket) => {
  console.log(`Cliente ${socket.id} connected`)

  const { chatId } = socket.handshake.query
  socket.join(chatId)

  socket.on(NEW_MESSAGE, (data => {
    io.in(chatId).emit(NEW_MESSAGE, data)
  }))

  socket.on('disconnect', () => {
    socket.leave(chatId)
  })
})
