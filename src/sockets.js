const { saveMessage, getMessages } = require('./services/saveMessage')

const NEW_MESSAGE = 'newMessage'

module.exports = (io) => {

  io.on('connection', (socket) => {
    console.log(`Cliente ${socket.id} connected`)

    const { chatId } = socket.handshake.query
    socket.join(chatId)

    socket.on(NEW_MESSAGE, (message => {
      saveMessage(message, chatId)

      io.in(chatId).emit(NEW_MESSAGE, message)
    }))

    socket.on('getMessages', (chatId => {
      console.log(chatId)
      const messages = getMessages(chatId)
      messages.then(data => {
        console.log(data)
      })
    }))

    socket.on('disconnect', () => {
      socket.leave(chatId)
    })
  })
}