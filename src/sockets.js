const { addNewUser, removeUser, getUser } = require('./utils/onlineUsersUtils')
const { saveMessage } = require('./services/saveMessage')

// const NEW_MESSAGE = 'newMessage'

let onlineUsers = []


module.exports = (io) => {

  io.on('connection', (socket) => {
    //console.log('Connected', socket.handshake.query)
    console.log('Connected', socket.id)

    socket.on('newUser', (userId) => {
      onlineUsers = addNewUser(onlineUsers, userId, socket.id)
      console.log(onlineUsers)
    })


    socket.on('newChat', chatId => {
      socket.join(chatId)
    })

    socket.on('exit', chatId => {
      socket.leave(chatId)
    })

    socket.on('newMessage', ({message, chatId, receiverId}) => {
      io.in(chatId).emit('sendMessage', message)

      saveMessage(message, chatId)
        .then(message => {
          const reseiver = getUser(onlineUsers, receiverId)
          io.in(reseiver?.socketId).emit('lastMessage', message)
        })
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