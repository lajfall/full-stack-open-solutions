const users = {
  riceball: {
    username: 'riceball',
    password: 'riceball',
    name: 'Riceball',
  },
  snowball: {
    username: 'snowball',
    password: 'snowball',
    name: 'Snowball',
  },
}

const blog = {
  title: 'How to get Rich by Doing Nothing',
  author: 'A Millionare',
  url: 'howtogetrichbydoingnothing.com',
}

const loginWith = async (page, { username, password }) => {
  const usernameInput = page.getByTestId('username')
  await usernameInput.fill(username)

  const passwordInput = page.getByTestId('password')
  await passwordInput.fill(password)

  const loginButton = page.getByTestId('login')
  await loginButton.click()
}

const createBlog = async (page, { title, author, url }) => {
  const showForm = page.getByTestId('show-new-blog-form')
  await showForm.click()

  const titleInput = page.getByTestId('title-input')
  await titleInput.fill(title)

  const authorInput = page.getByTestId('author-input')
  await authorInput.fill(author)

  const urlInput = page.getByTestId('url-input')
  await urlInput.fill(url)

  const createButton = page.getByTestId('create-blog')
  await createButton.click()
}

module.exports = { users, blog, loginWith, createBlog }
