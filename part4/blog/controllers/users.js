const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const { username, password, name } = req.body

  if (!username) {
    return res.status(400).send({ error: 'username is required' })
  }

  if (!password) {
    return res.status(400).send({ error: 'password is required' })
  }

  if (username.length < 3) {
    return res
      .status(400)
      .send({ error: 'username must have at least 3 characters' })
  }

  if (password.length < 3) {
    return res
      .status(400)
      .send({ error: 'password must have at least 3 characters' })
  }

  const saltRounds = 10
  try {
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({ username, passwordHash, name })
    const saved = await user.save()
    res.status(201).json(saved)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ error: 'username must be unique' })
    }
    next(error)
  }
})

module.exports = router
