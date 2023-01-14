const Message = require('./models/Message')

const NEW_MESSAGE = 'newMessage'

module.exports = (io) => {

  io.on('connection', (socket) => {
    console.log(`Cliente ${socket.id} connected`)

    const { chatId } = socket.handshake.query
    socket.join(chatId)

    socket.on(NEW_MESSAGE, (message => {

      const sendMessage = async () => {
        const newMessage = new Message({
          ...message
        })

        const savedMessage = await newMessage.save()
        io.in(chatId).emit(NEW_MESSAGE, savedMessage)
      }

      sendMessage()

      console.log(message)
    }))

    socket.on('disconnect', () => {
      socket.leave(chatId)
    })
  })
}