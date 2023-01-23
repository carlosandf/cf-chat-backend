const Message = require('../models/Message')
const Chat = require('../models/Chat')

const saveMessage = async (message, chatId) => {
  const chat = await Chat.findOne({id: chatId}).populate(['messages','members'])

  const newMessage = new Message({
    ...message
  })

  const savedMessage = await newMessage.save()
  chat.messages = chat.messages.concat(savedMessage._id)
  await chat.save()

  return savedMessage.toJSON()
}

const getMessages = async (chatId) => {
  const messages = await Message.find({chatId: chatId})
  return messages
}

module.exports = { saveMessage, getMessages }