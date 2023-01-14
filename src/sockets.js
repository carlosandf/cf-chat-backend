const NEW_MESSAGE = 'newMessage'

module.exports = (io) => {

  io.on('connection', (socket) => {
    console.log(`Cliente ${socket.id} connected`)

    const { chatId } = socket.handshake.query
    socket.join(chatId)

    socket.on(NEW_MESSAGE, (message => {
      console.log(message)
      io.in(chatId).emit(NEW_MESSAGE, message)
    }))

    socket.on('disconnect', () => {
      socket.leave(chatId)
    })
  })
}