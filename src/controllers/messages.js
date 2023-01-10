const messageRouter = require('express').Router()
const Message = require('../models/Message')

messageRouter.get('/:chatId', async (req, res) => {
  const { chatId } = req.params

  try {
    const messages = await Message.find({chatId})
    res.status(200).json(messages)
  } catch (error) {
    res.json(error)
  }
})

messageRouter.post('/', async (req, res) => {
  const { sender, chatId, text } = req.body

  if(text === '') {
    return res.status(400).json({
      error: 'message empty'
    })
  }

  const newMessage = new Message({
    sender,
    chatId,
    text
  })

  try {
    const savedMessage = await newMessage.save()
    res.status(200).json(savedMessage)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = messageRouter