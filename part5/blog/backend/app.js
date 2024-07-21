const express = require('express')
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testRouter = require('./controllers/test')
const {
  tokenExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require('./utils/middleware')

const app = express()
app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use(requestLogger)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/test', testRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
