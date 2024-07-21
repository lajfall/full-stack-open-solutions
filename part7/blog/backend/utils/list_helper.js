const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const blog = blogs.reduce((fav, blog) => {
    if (fav === null || blog.likes > fav.likes) {
      return blog
    } else {
      return fav
    }
  }, null)

  if (blog === null) {
    return null
  }

  const { title, author, likes } = blog
  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogCountByAuthors = _.countBy(blogs, 'author')
  const authors = _.keys(blogCountByAuthors)
  const authorWithMostBlogs = _.maxBy(
    authors,
    (author) => blogCountByAuthors[author]
  )

  return {
    author: authorWithMostBlogs,
    blogs: blogCountByAuthors[authorWithMostBlogs],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogByAuthors = _.groupBy(blogs, 'author')
  const countLikes = (blogs) => _.sumBy(blogs, 'likes')
  const likesCount = _.mapValues(blogByAuthors, (blogs) => countLikes(blogs))
  const authors = _.keys(blogByAuthors)
  const mostLikedAuthor = _.maxBy(authors, (author) => likesCount[author])

  return {
    author: mostLikedAuthor,
    likes: likesCount[mostLikedAuthor],
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
