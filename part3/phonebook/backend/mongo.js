const mongoose = require('mongoose')
const { Contact } = require('./lib/models')

const args = process.argv.slice(2)

if (args.length !== 1 && args.length !== 3) {
  return console.log('argument format: password [name number]')
}

const [password, name, number] = args

const url = `mongodb+srv://lajfa:${password}@db.qacm2tz.mongodb.net/contacts?retryWrites=true&w=majority&appName=db`

mongoose.set('strictQuery', false)
mongoose.connect(url)

if (name && password) {
  const contact = new Contact({ name, number })
  contact.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Contact.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach(({ name, number }) => console.log(name, number))
    mongoose.connection.close()
  })
}
