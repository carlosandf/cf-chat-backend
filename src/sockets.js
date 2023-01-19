const { addNewUser, removeUser } = require('./utils/onlineUsersUtils')
const { saveMessage } = require('./services/saveMessage')

// const NEW_MESSAGE = 'newMessage'

let onlineUsers = []


module.exports = (io) => {

  io.on('connection', (socket) => {
    console.log('Connected', socket.handshake.query)
    console.log('Connected', socket.id)

    socket.on('newUser', (username) => {
      onlineUsers = addNewUser(onlineUsers, username, socket.id)
    })


    socket.on('newChat', chatId => {
      socket.join(chatId)
    })

    socket.on('newMessage', data => {
      console.log(data)

      saveMessage(data.message, data.chatId)

      io.in(data.chatId).emit('sendMessage', data.message)
    })

    socket.on('disconnect', () => {
      console.log('disconnect')
      onlineUsers = removeUser(onlineUsers, socket.id)
    })
  })
}

// const { chatId, userId } = socket.handshake.query
// socket.join(chatId)
// socket.id = userId
// console.log(`Cliente ${socket.id} connected`)

// socket.on(NEW_MESSAGE, (message => {
//   saveMessage(message, chatId)

//   io.in(chatId).emit(NEW_MESSAGE, message)
// }))