const server = require('http').createServer()

const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})

const PORT = process.env.PORT | 3000
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

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
