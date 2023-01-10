const NEW_MESSAGE = 'newMessage'

module.exports = (io) => {

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
}