const saveMessage = require('./services/saveMessage')

const NEW_MESSAGE = 'newMessage'

module.exports = (io) => {

  io.on('connection', (socket) => {
    console.log(`Cliente ${socket.id} connected`)

    const { chatId } = socket.handshake.query
    socket.join(chatId)

    socket.on(NEW_MESSAGE, (message => {
      const savedMessage = saveMessage(message, chatId)
      savedMessage.then(console.log)

      io.in(chatId).emit(NEW_MESSAGE, message)
    }))

    socket.on('disconnect', () => {
      socket.leave(chatId)
    })
  })
}