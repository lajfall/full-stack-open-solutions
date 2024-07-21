const express = require('express')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const { SECRET } = require('../utils/config')
const { userExtractor } = require('../utils/middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

router.post('/', userExtractor, async (req, res, next) => {
  try {
    const user = req.user

    if (!user) {
      return res.status(401).json({ error: 'invalid token' })
    }

    const { title, author, url, likes } = req.body

    if (title === undefined || url === undefined) {
      return res.status(400).send({ error: 'title or url missing' })
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: Number(likes) || 0,
      user: user._id,
      comments: [],
    })

    const saved = await blog.save()

    user.blogs = user.blogs.concat(saved._id)
    await user.save()

    await saved.populate('user', { username: 1, name: 1 })
    res.status(201).json(saved)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', userExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).send({ error: 'blog does not exist' })
    }

    const user = req.user

    if (!user) {
      return res.status(401).send({ error: 'user not exist' })
    }

    if (String(user.id) !== String(blog.user)) {
      return res
        .status(401)
        .send({ error: 'can only be deleted by the creator' })
    }

    await blog.deleteOne()

    user.blogs = user.blogs.filter((id) => String(id) !== blog.id)
    await user.save()

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  const { id, title, author, url, likes, comments } = req.body
  try {
    const updated = await Blog.findByIdAndUpdate(
      id,
      { title, author, url, likes: Number(likes), comments },
      { new: true, runValidators: true }
    ).populate('user', { username: 1, name: 1 })
    res.status(201).json(updated)
  } catch (error) {
    next(error)
  }
})

module.exports = router
