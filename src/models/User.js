const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profilePicture: {
      type: String,
      default: '',
    },
    private: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)


userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

userSchema.pre('save', async function(next) {
  const user = this
  if (!user.isModified('password')) return next()

  try {
    const saltRounds = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, saltRounds)

    user.password = hash
  } catch (error) {
    console.error(error)
    next()
  }
})

userSchema.plugin(uniqueValidator, { message: 'invalid {PATH}' })
const User = model('User', userSchema)

module.exports = User