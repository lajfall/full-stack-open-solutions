const mongoose = require('mongoose')
const app = require('./app')
const logger = require('./utils/logger')
const { PORT, MONGODB_URI } = require('./utils/config')

mongoose.set('strictQuery', false)
logger.info('connecting...')

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info('connected')
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    logger.error(error.message)
  })
