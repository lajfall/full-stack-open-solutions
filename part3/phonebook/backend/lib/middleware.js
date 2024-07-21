const morgan = require('morgan')

morgan.token('payload', (req) => JSON.stringify(req.body))

const logger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :payload'
)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown Endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: 'malformatted name or number' })
  }

  next(error)
}

module.exports = { logger, errorHandler, unknownEndpoint }
