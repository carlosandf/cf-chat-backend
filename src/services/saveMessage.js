const Message = require('../models/Message')
const Chat = require('../models/Chat')

const saveMessage = async (message, chatId) => {
  const chat = await Chat.findById(chatId).populate(['messages','members'])

  const newMessage = new Message({
    ...message
  })

  const savedMessage = await newMessage.save()
  chat.messages = chat.messages.concat(savedMessage._id)
  await chat.save()

  return savedMessage
}

const getMessages = async (chatId) => {
  const messages = await Message.find({chatId})
  return messages
}

module.exports = { getMessages }
module.exports = saveMessage