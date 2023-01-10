const express = require('express')
const cors = require('cors')
const connectDB = require('./connectDB')
const usersRouter = require('./controllers/users')
const messagesRouter = require('./controllers/messages')
const chatsRouter = require('./controllers/chats')

const app = express()

connectDB() // connect to mongoDB

app.use(cors())
app.use(express.json)

// routes
app.use('/api/users', usersRouter)
app.use('/api/chats', chatsRouter)
app.use('/api/messages', messagesRouter)


module.exports = app