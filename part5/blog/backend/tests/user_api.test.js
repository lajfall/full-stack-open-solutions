const { describe, test, before, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../app')
const { MONGODB_URI } = require('../utils/config')
const User = require('../models/user')
const { initialUsers, validUser, invalidUsers } = require('./test_helper')

const api = request(app)

before(async () => {
  mongoose.set('strictQuery', false)
  await mongoose.connect(MONGODB_URI)
})

describe('User API', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Promise.all(
      initialUsers.map((user) => api.post('/api/users').send(user))
    )
  })

  describe('GET', () => {
    test('fetches all the users', async () => {
      const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.length, initialUsers.length)
    })
  })

  describe('POST', () => {
    test('a valid user can be created', async () => {
      const postResponse = await api
        .post('/api/users')
        .send(validUser)
        .expect(201)
      assert.strictEqual(postResponse.body.username, validUser.username)

      const getResponse = await api.get('/api/users')
      assert.strictEqual(getResponse.body.length, initialUsers.length + 1)
    })

    test('user without username is rejected', async () => {
      const postResponse = await api
        .post('/api/users')
        .send(invalidUsers.userWithoutUsername)
        .expect(400)

      assert.strictEqual(postResponse.body.error, 'username is required')
    })

    test('user without password is rejected', async () => {
      const postResponse = await api
        .post('/api/users')
        .send(invalidUsers.userWithoutPassword)
        .expect(400)

      assert.strictEqual(postResponse.body.error, 'password is required')
    })

    test('username must have at least 3 characters', async () => {
      const postResponse = await api
        .post('/api/users')
        .send(invalidUsers.usernameTooShort)
        .expect(400)

      assert.strictEqual(
        postResponse.body.error,
        'username must have at least 3 characters'
      )
    })

    test('password must have at least 3 characters', async () => {
      const postResponse = await api
        .post('/api/users')
        .send(invalidUsers.passwordTooShort)
        .expect(400)

      assert.strictEqual(
        postResponse.body.error,
        'password must have at least 3 characters'
      )
    })

    test('username must be unique', async () => {
      await api.post('/api/users').send(validUser).expect(201)
      const postResponse = await api
        .post('/api/users')
        .send(validUser)
        .expect(400)

      assert.strictEqual(postResponse.body.error, 'username must be unique')

      const getResponse = await api.get('/api/users')
      assert.strictEqual(getResponse.body.length, initialUsers.length + 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
