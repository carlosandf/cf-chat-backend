const { Schema, model } = require('mongoose')
//const bcrypt = require('bcrypt')

const messageSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  content: { type: String, required: true },
  hour: { type: Date }
},
{
  timestamps: true
})


messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// messageSchema.pre('save', async function(next) {
//   const message = this

//   try {
//     const saltRounds = await bcrypt.genSalt(10)
//     const messageHash = await bcrypt.hash(message.content, saltRounds)

//     message.content = messageHash
//   } catch (error) {
//     console.error(error)
//     next()
//   }
// })

const Message = model('User', messageSchema)

module.exports = Message