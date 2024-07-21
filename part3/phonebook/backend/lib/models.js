const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => /^(\d{2}|\d{3})-\d+$/.test(v),
    },
  },
})

contactSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  },
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = { Contact }
