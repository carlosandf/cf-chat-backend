const messageRouter = require('express').Router()
const Message = require('../models/Message')
const Chat = require('../models/Chat')
const userExtractor = require('../middlewares/userExtractor')

messageRouter.get('/:chatId', async (req, res) => {
  const { chatId } = req.params

  try {
    const messages = await Message.find({chatId})
    res.status(200).json(messages)
  } catch (error) {
    res.json(error)
  }
})

messageRouter.post('/', userExtractor, async (req, res) => {
  const { chatId, text } = req.body
  const { userId } = req

  const chat = await Chat.findById(chatId)

  if(text === '') {
    return res.status(400).json({
      error: 'message empty'
    })
  }

  const newMessage = new Message({
    sender: userId,
    chatId: chat._id,
    text
  })

  try {
    const savedMessage = await newMessage.save()
    chat.messages = chat.messages.concat(savedMessage._id)
    await chat.save()

    res.status(200).json(savedMessage)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = messageRouter