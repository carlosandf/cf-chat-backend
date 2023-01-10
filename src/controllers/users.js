const userRouter = require('express').Router()
const User = require('../models/User')

userRouter.get('/', async (req, res) => {
  const publicUsers = await User.find({private: false})
  res.status(200).json(publicUsers)
})

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    res.status(200).json(user)
  } catch (error) {
    res.json(error)
  }
})

userRouter.get('/:username', async (req, res) => {
  const { username } = req.params

  try {
    const user = await User.find({username})
    res.status(200).json(user)
  } catch (error) {
    res.json(error)
  }
})

userRouter.post('/', async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    password
  } = req.body

  try {
    const newUser = new User({
      firstname,
      lastname,
      username,
      password
    })

    const savedUser = await newUser.save()

    res.status(201).json(savedUser)
  } catch (error) {
    res.json(error)
  }
})

module.exports = userRouter