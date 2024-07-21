const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { SECRET } = require('../utils/config')

const router = express.Router()

router.post('/', async (req, res, next) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  const match = user && (await bcrypt.compare(password, user.passwordHash))

  if (!match) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  const { name, _id } = user

  const token = jwt.sign(
    { username, id: _id },
    SECRET
    // {expiresIn: '30s'}
  )
  
  res.json({ token, username, name })
})

module.exports = router
