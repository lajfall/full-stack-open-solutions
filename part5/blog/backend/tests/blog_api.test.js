const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')
const { MONGODB_URI } = require('../utils/config')
const {
  validUser,
  invalidToken,
  singleBlog,
  multipleBlogs,
} = require('./test_helper')

const api = request(app)

let token = null

beforeEach(async () => {
  mongoose.set('strictQuery', false)
  await mongoose.connect(MONGODB_URI)

  await User.deleteMany({})
  await api.post('/api/users').send(validUser)
  const response = await api.post('/api/login').send(validUser)
  token = 'Bearer ' + response.body.token
})

describe.only('Blog API', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    for (let i = 0; i < multipleBlogs.length; i++) {
      const blog = multipleBlogs[i]
      await api.post('/api/blogs').set({ Authorization: token }).send(blog)
    }
  })

  describe('GET', () => {
    test('returns the correct number of data in json format', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      assert.strictEqual(response.body.length, multipleBlogs.length)
    })

    test('transformed _id field to id', async () => {
      const response = await api.get('/api/blogs')
      const blog = response.body[0]
      assert.strictEqual(blog.hasOwnProperty('id'), true)
      assert.strictEqual(blog.hasOwnProperty('_id'), false)
    })
  })

  describe('POST', () => {
    test('a new blog can be created', async () => {
      const responseBefore = await api.get('/api/blogs')

      await api
        .post('/api/blogs')
        .set({ Authorization: token })
        .send(singleBlog)

      const responseAfter = await api.get('/api/blogs')

      assert.strictEqual(
        responseBefore.body.length + 1,
        responseAfter.body.length
      )

      assert.strictEqual(
        responseAfter.body.map((b) => b.title).includes(singleBlog.title),
        true
      )
    })

    test('likes default to 0', async () => {
      const blog = singleBlog
      delete blog.likes

      const response = await api
        .post('/api/blogs')
        .set({ Authorization: token })
        .send(blog)

      assert.strictEqual(response.body.likes, 0)
    })

    test('title and url are required', async () => {
      const { _id, title, author, url, likes, __v } = singleBlog

      let response = await api
        .post('/api/blogs')
        .set({ Authorization: token })
        .send({ _id, author, url, likes, __v })
        .expect(400)

      assert.strictEqual(response.body.error, 'title or url missing')

      response = await api
        .post('/api/blogs')
        .set({ Authorization: token })
        .send({ _id, title, author, likes, __v })
        .expect(400)

      assert.strictEqual(response.body.error, 'title or url missing')
    })

    test('fails with invalid token', async () => {
      const responseBefore = await api.get('/api/blogs')

      await api
        .post('/api/blogs')
        .set({ Authorization: invalidToken })
        .send(singleBlog)
        .expect(401)

      const responseAfter = await api.get('/api/blogs')

      assert.strictEqual(responseBefore.body.length, responseAfter.body.length)

      assert.strictEqual(
        responseAfter.body.map((b) => b.title).includes(singleBlog.title),
        false
      )
    })
  })

  describe.only('DELETE', () => {
    test.only('works with valid id', async () => {
      const responseBefore = await api.get('/api/blogs')
      const { id, title } = responseBefore.body[0]

      await api
        .delete(`/api/blogs/${id}`)
        .set({ Authorization: token })
        .expect(204)
        
      const responseAfter = await api.get('/api/blogs')

      assert.strictEqual(
        responseBefore.body.length,
        responseAfter.body.length + 1
      )

      const titles = responseAfter.body.map((b) => b.title)
      assert.strictEqual(titles.includes(title), false)
    })
  })

  describe('UPDATE', () => {
    test('likes can be incremented', async () => {
      const responseBefore = await api.get('/api/blogs')
      const blog = responseBefore.body[0]

      await api
        .put(`/api/blogs/${blog.id}`)
        .send({ ...blog, likes: blog.likes + 1 })
        .expect(201)

      const responseAfter = await api.get('/api/blogs')
      const updated = responseAfter.body.find((b) => b.id === blog.id)
      assert.strictEqual(updated.likes, blog.likes + 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
