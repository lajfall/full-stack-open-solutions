const { test, expect, describe, beforeEach } = require('@playwright/test')
const { users, blog, loginWith, createBlog } = require('./test-helper')

const { riceball, snowball } = users

describe('Blog App', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('shows login form', async ({ page }) => {
    const loginForm = page.getByTestId('login-form')
    await expect(loginForm).toBeVisible()
  })

  describe('Login', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:5173/api/test/reset')
      await request.post('http://localhost:5173/api/users', { data: riceball })
      await request.post('http://localhost:5173/api/users', { data: snowball })
    })

    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, riceball)
      const userInfo = page.getByText(`${riceball.name} logged in`)
      await expect(userInfo).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const { username } = riceball
      const { password } = snowball
      await loginWith(page, { username, password })
      const errorMessage = page.getByText('wrong username or password')
      await expect(errorMessage).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, riceball)
      })

      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, blog)
        const blogTitle = page.getByText(blog.title, { exact: true })
        await expect(blogTitle).toBeVisible()
      })
    })

    describe('When viewing a blog', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, riceball)
        await createBlog(page, blog)
        const detailsToggle = page.getByTestId('toggle-button')
        await detailsToggle.click()
      })

      test('like button works', async ({ page }) => {
        const likesBefore = page.getByTestId('likes')
        const likeButton = page.getByTestId('like-button')
        await likeButton.click()
        const likesAfter = page.getByTestId('likes')
        expect(Number(likesAfter)).toBe(Number(likesBefore) + 1)
      })
    })
  })
})
