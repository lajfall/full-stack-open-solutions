const singleBlog = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  likes: 5,
}

const multipleBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 8,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

const validUser = {
  username: 'valid',
  password: 'valid',
  name: 'valid',
}

const invalidUsers = {
  userWithoutUsername: {
    password: 'anonymous',
    name: 'anonymous',
  },

  userWithoutPassword: {
    username: 'passwordless',
    name: 'passwordless',
  },

  usernameTooShort: {
    username: 'un',
    password: 'normal',
    name: 'short username',
  },

  passwordTooShort: {
    username: 'normal',
    password: 'pw',
    name: 'short password',
  },
}

const initialUsers = [
  {
    username: 'first',
    password: 'first',
    name: 'first',
  },
  {
    username: 'second',
    password: 'second',
    name: 'second',
  },
  {
    username: 'third',
    password: 'third',
    name: 'third',
  },
]

const invalidToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiI2NjkyOTAwNmY0N2Q2OWY3ZTg4ODZhMDciLCJpYXQiOjE3MjA4ODMwNzh9.rSQUDGeH9lgPQtp6lUbrMpuaFTGILvx1Z3xEP35YyXU'

module.exports = {
  singleBlog,
  multipleBlogs,
  initialUsers,
  validUser,
  invalidUsers,
  invalidToken,
}
