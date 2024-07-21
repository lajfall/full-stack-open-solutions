import axios from 'axios'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlog = ({ setShowBlogForm }) => {
  const ref = useRef(null)
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser)

  const handleSubmit = (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const author = e.target.author.value
    const url = e.target.url.value
    const headers = { Authorization: `Bearer ${currentUser.token}` }

    try {
      axios
        .post('/api/blogs', { title, author, url }, { headers })
        .then((response) => {
          const blog = response.data
          dispatch(addBlog(blog))
          ref.current.reset()
          setShowBlogForm(false)
          dispatch(setNotification(`added ${blog.title}`))
        })
    } catch (error) {
      dispatch(setNotification(error.message))
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit} ref={ref}>
        <div>
          <label>
            title:{' '}
            <input
              required
              type="text"
              name="title"
              data-testid="title-input"
            />
          </label>
        </div>
        <div>
          <label>
            author:{' '}
            <input
              required
              type="text"
              name="author"
              data-testid="author-input"
            />
          </label>
        </div>
        <div>
          <label>
            url:{' '}
            <input required type="text" name="url" data-testid="url-input" />
          </label>
        </div>
        <br />
        <div>
          <button data-testid="create-blog">create</button>
        </div>
      </form>
    </div>
  )
}

export default NewBlog
