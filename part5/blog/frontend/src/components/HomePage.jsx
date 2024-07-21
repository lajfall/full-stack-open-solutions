import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import BlogList from './BlogList'
import NewBlog from './NewBlog'
import Notification from './Notification'
import TogglePanel from './TogglePanel'

const HomePage = ({ user, setUser, message, setMessage }) => {
  const [blogs, setBlogs] = useState(null)
  const [showBlogForm, setShowBlogForm] = useState(false)
  const url = 'api/blogs'

  useEffect(() => {
    axios.get(url).then((response) => {
      setBlogs(response.data)
    })
  }, [])

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={message} />
      <div>
        <span>{user.name ?? user.username} logged in </span>
        <button onClick={handleLogout}>logout</button>
      </div>
      <br />
      <TogglePanel showContent={showBlogForm} setShowContent={setShowBlogForm}>
        <NewBlog
          user={user}
          setBlogs={setBlogs}
          setMessage={setMessage}
          setShowBlogForm={setShowBlogForm}
        />
      </TogglePanel>
      <br />
      <BlogList user={user} blogs={blogs} setBlogs={setBlogs} />
    </div>
  )
}

export default HomePage
