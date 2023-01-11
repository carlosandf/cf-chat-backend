const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/User')
const { SECRET_KEY } = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    const isCorrectPassword = user === null
      ? false
      : await bcrypt.compare(password, user.password)

    if (!(user && isCorrectPassword)) {
      return res.status(401).json({
        error: 'invalid user or password'
      })
    }

    const userForToken = {
      id: user._id,
      username: user.username
    }

    const token = jwt.sign(userForToken, SECRET_KEY)

    res.send({
      fullname: `${user.firstname} ${user.lastname}`,
      username: user.username,
      token
    })

  } catch (error) {
    res.json(error)
  }
})

module.exports = loginRouter