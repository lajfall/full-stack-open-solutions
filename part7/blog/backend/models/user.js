const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minLength: 3,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    delete ret.passwordHash
  },
})

module.exports = mongoose.model('User', userSchema)
