const chatsRouter = require('express').Router()
const Chat = require('../models/Chat')

chatsRouter.get('/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const chats = await Chat.find({
      members: { $in: [userId] }
    }).populate('user')

    res.status(200).json(chats)
  } catch (error) {
    res.status(500).json(error)
  }
})

chatsRouter.post('/', async (req, res) => {
  const { members } = req.body

  try {
    const newChat = new Chat({members})
    const savedChat = await newChat.save()
    res.status(201).json(savedChat)
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = chatsRouter