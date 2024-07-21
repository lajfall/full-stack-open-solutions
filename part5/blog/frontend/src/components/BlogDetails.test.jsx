import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogDetails from './BlogDetails'

const user = {
  id: 'test id',
  username: 'test username',
  name: 'test name',
}

const blog = {
  id: 'blog id',
  title: 'blog title',
  author: 'blog author',
  url: 'blog url',
  likes: 0,
  user,
}

const bot = userEvent.setup()

beforeEach(() => {
  render(<BlogDetails user={user} blog={blog} />)
})

test('only shows title and author initially', () => {
  const title = screen.getByTestId('title')
  expect(title).toBeVisible()

  const author = screen.getByTestId('author')
  expect(author).toBeVisible()

  const url = screen.getByTestId('url')
  expect(url).not.toBeVisible()

  const likes = screen.getByTestId('likes')
  expect(likes).not.toBeVisible()
})

describe('when toggle button clicked', () => {
  beforeEach(async () => {
    const toggleButton = screen.getByTestId('toggle-button')
    await bot.click(toggleButton)
  })

  test('also shows url and likes', async () => {
    const title = screen.getByTestId('title')
    expect(title).toBeVisible()

    const author = screen.getByTestId('author')
    expect(author).toBeVisible()

    const url = screen.getByTestId('url')
    expect(url).toBeVisible()

    const likes = screen.getByTestId('likes')
    expect(likes).toBeVisible()
  })
})
