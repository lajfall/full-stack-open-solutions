require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { Contact } = require('./lib/models')
const { logger, errorHandler, unknownEndpoint } = require('./lib/middleware')

const app = express()
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(logger)

app.get('/info', (req, res, next) => {
  Contact.find({})
    .then((contacts) => {
      res.send(
        `<p>Phonebook has info for ${contacts.length} people</p>
       <p>${new Date()}</p>`
      )
    })
    .catch((error) => {
      next(error)
    })
})

app.get('/api/persons', (req, res, next) => {
  Contact.find({})
    .then((contacts) => {
      res.json(contacts)
    })
    .catch((error) => {
      next(error)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Contact.findById(id)
    .then((contact) => {
      res.json(contact)
    })
    .catch((error) => {
      next(error)
    })
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({
      error: 'name or number missing',
    })
  }

  const person = new Contact({
    name,
    number,
  })

  person
    .save()
    .then((saved) => {
      res.json(saved)
    })
    .catch((error) => {
      next(error)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const { id, name, number } = req.body

  Contact.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true }
  )
    .then((saved) => {
      res.json(saved)
    })
    .catch((error) => {
      next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Contact.findByIdAndDelete(id)
    .then(() => {
      res.status(204).send()
    })
    .catch((error) => {
      next(error)
    })
})

app.use(unknownEndpoint)
app.use(errorHandler)

const port = process.env.PORT
const url = process.env.MONGODB_URI

app.listen(port, () => {
  console.log(`running on port ${port}`)
  console.log('connecting to db')
  mongoose
    .connect(url)
    .then(() => {
      console.log('connected')
    })
    .catch((e) => {
      console.log(e.message)
    })
})
