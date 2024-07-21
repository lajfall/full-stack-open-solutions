const { test, describe } = require('node:test')
const assert = require('node:assert')
const {singleBlog, multipleBlogs} = require('./test_helper')
const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require('../utils/list_helper')

describe('List Helper', () => {
  test('dummy returns 1', () => {
    const blogs = []
    const result = dummy(blogs)
    assert.strictEqual(result, 1)
  })

  describe('total likes', () => {
    test('of empty list is 0', () => {
      const blogs = []
      const result = totalLikes(blogs)
      assert.strictEqual(result, 0)
    })

    test('of one blog is correct', () => {
      const result = totalLikes([singleBlog])
      assert.strictEqual(result, singleBlog.likes)
    })

    test('of multiple blogs is correct', () => {
      const result = totalLikes(multipleBlogs)
      assert.strictEqual(result, 29)
    })
  })

  describe('favorite blog', () => {
    test('of empty list is null', () => {
      const result = favoriteBlog([])
      assert.strictEqual(result, null)
    })

    test('is correct when there is only 1 blog', () => {
      const result = favoriteBlog([singleBlog])
      const { title, author, likes } = singleBlog
      assert.deepStrictEqual(result, { title, author, likes })
    })

    test('of multiple blogs is correct', () => {
      const result = favoriteBlog(multipleBlogs)
      const expected = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12,
      }
      assert.deepStrictEqual(result, expected)
    })
  })

  describe('author with most blogs', () => {
    test('of empty list is null', () => {
      const result = mostBlogs([])
      assert.strictEqual(result, null)
    })

    test('is correct when there is only 1 blog', () => {
      const result = mostBlogs([singleBlog])
      assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 1 })
    })

    test('of multiple blogs is correct', () => {
      const result = mostBlogs(multipleBlogs)
      assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
    })
  })

  describe('author with most likes', () => {
    test('of empty list is null', () => {
      const result = mostLikes([])
      assert.strictEqual(result, null)
    })

    test('is correct when there is only 1 blog', () => {
      const result = mostLikes([singleBlog])
      assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 5 })
    })

    test('of multiple blogs is correct', () => {
      const result = mostLikes(multipleBlogs)
      assert.deepStrictEqual(result, {
        author: 'Edsger W. Dijkstra',
        likes: 12,
      })
    })
  })
})
