import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { updateBlog, deleteBlog } from '../reducers/blogsReducer'

const BlogPage = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser)

  const match = useMatch('/blogs/:id')
  const { id } = match.params
  const blog = useSelector((state) => state?.blogs?.find((b) => b.id === id))

  const like = () => {
    axios
      .put(`/api/blogs/${blog.id}`, { ...blog, likes: blog.likes + 1 })
      .then((response) => {
        dispatch(updateBlog(response.data))
      })
  }

  const remove = () => {
    const headers = { Authorization: `Bearer ${currentUser.token}` }

    if (confirm(`delete ${blog.title}?`)) {
      axios.delete(`/api/blogs/${blog.id}`, { headers }).then(() => {
        dispatch(deleteBlog(blog.id))
      })
    }
  }

  const addComment = (e) => {
    e.preventDefault()

    axios
      .put(`/api/blogs/${blog.id}`, {
        ...blog,
        comments: blog.comments.concat(e.target.comment.value),
      })
      .then((response) => {
        dispatch(updateBlog(response.data))
        e.target.comment.value = ''
      })
  }

  if (blog) {
    return (
      <div>
        <h2>
          {blog.title} {blog.author}
        </h2>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <br />
        <div>
          {blog.likes} likes <button onClick={like}>like</button>
        </div>
        <br />
        <div>added by {blog.user.name ?? blog.user.username}</div>
        <br />
        {currentUser.username === blog.user.username && (
          <button onClick={remove}>remove</button>
        )}
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <input type="text" name="comment" />
          <button>add comment</button>
        </form>
        <ul>
          {blog.comments.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default BlogPage
