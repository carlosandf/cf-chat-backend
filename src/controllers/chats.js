const chatsRouter = require('express').Router()
const userExtractor = require('../middlewares/userExtractor')
const Chat = require('../models/Chat')

// chatsRouter.get('/', async (req, res) => {
//   try {
//     const allChats = await Chat.find({}).populate('messages')
//     res.status(200).json(allChats)
//   } catch (error) {
//     res.json(error)
//   }
// })

chatsRouter.get('/', userExtractor, async (req, res) => {
  const { userId } = req

  try {
    const chats = await Chat.find({ members: { $in: [userId] } }).populate(['messages','members'])

    res.status(200).json(chats)
  } catch (error) {
    res.status(500).json({error})
  }
})

chatsRouter.post('/', userExtractor, async (req, res) => {
  const { members } = req.body

  try {
    const newChat = new Chat({members})
    const savedChat = await newChat.save()
    res.status(201).json(savedChat)
  } catch (error) {
    res.status(400).json(error)
  }
})

chatsRouter.delete('/:userId/:chatId', async (req, res) => {
  const { userId, chatId } = req.params

  try {
    const chat = await Chat.findById(chatId)
    chat.members = chat.members.filter(member => member === userId)
    await chat.save()

    res.status(204).end()
  } catch (error) {
    res.json(error)
  }

})
module.exports = chatsRouter