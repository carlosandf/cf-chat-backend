const { Schema, model } = require('mongoose')
//const bcrypt = require('bcrypt')

const messageSchema = new Schema(
  {
    sender: {
      type: String
    },
    chatId: {
      type: String
    },
    text: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      default: false
    },
    hour: {
      type: String
    }
  },
  { timestamps: true }
)


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
//     const messageHash = await bcrypt.hash(message.text, saltRounds)

//     message.text = messageHash
//   } catch (error) {
//     console.error(error)
//     next()
//   }
// })

const Message = model('Message', messageSchema)

module.exports = Message