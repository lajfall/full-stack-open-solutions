const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')
const { SECRET } = require('../utils/config')

const tokenExtractor = (req, res, next) => {
  let token = null
  const authorization = req.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    token = authorization.replace('Bearer ', '')
  }

  req.token = token
  next()
}

const userExtractor = async (req, res, next) => {
  let user = null
  const { token } = req

  if (token) {
    const decodedToken = jwt.verify(token, SECRET)

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'invalid token' })
    }

    user = await User.findById(decodedToken.id)
  }

  req.user = user
  next()
}

const requestLogger = (req, _, next) => {
  logger.info(
    `${req.method} ${req.path} ${JSON.stringify(req.body)}`
  )
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error)

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).send({ error: 'token expired' })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  userExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
