const { Schema, model } = require('mongoose')

const chatSchema = new Schema(
  {
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    messages: [{
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }]
  },
  { timestamps: true }
)

chatSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Chat = model('Chat', chatSchema)

module.exports = Chat