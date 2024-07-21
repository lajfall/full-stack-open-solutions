import axios from 'axios'
import { useState } from 'react'

const BlogDetails = ({ user, blog, setBlogs }) => {
  const [showDetails, setShowDetails] = useState(false)

  const like = () => {
    axios
      .put(`/api/blogs/${blog.id}`, { ...blog, likes: blog.likes + 1 })
      .then((response) => {
        setBlogs((prev) =>
          prev.map((b) => (b.id === blog.id ? response.data : b))
        )
      })
  }

  const remove = () => {
    const headers = { Authorization: `Bearer ${user.token}` }

    if (confirm(`delete ${blog.title}?`)) {
      axios.delete(`/api/blogs/${blog.id}`, { headers }).then(() => {
        setBlogs((prev) => prev.filter((b) => b.id !== blog.id))
      })
    }
  }

  return (
    <div style={{ margin: '5px', border: '1px solid', padding: '5px' }}>
      <div>
        <span data-testid="title">{blog.title} </span>
        {' - '}
        <span data-testid="author">{blog.author} </span>
        <button
          data-testid="toggle-button"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      <div style={{ display: showDetails ? 'block' : 'none' }}>
        <div data-testid="url">{blog.url}</div>
        <div>
          likes <span data-testid="likes">{blog.likes}</span>
          <button onClick={like} data-testid="like-button">
            like
          </button>
        </div>
        <div>{blog.user.name || blog.user.username}</div>
        <button
          onClick={remove}
          data-testid="delete-button"
          style={{
            display: user.username === blog.user.username ? 'initial' : 'none',
          }}
        >
          remove
        </button>
      </div>
    </div>
  )
}

export default BlogDetails
