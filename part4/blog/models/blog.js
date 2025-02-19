const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
