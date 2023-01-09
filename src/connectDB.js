const { connect, set } = require('mongoose')
const { MONGO_URI } = require('./utils/config')

const connectDB = async () => {
  set('strictQuery', true)
  try {
    const resp = await connect(MONGO_URI, { useNewUrlParser: true })
    console.log(`MongoDB connected: ${resp.connection.host}`)
  } catch (error) {
    console.error(error)
  }
}

module.exports = connectDB