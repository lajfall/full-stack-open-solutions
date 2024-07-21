import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUsers } from '../reducers/usersReducer'
import { setBlogs } from '../reducers/blogsReducer'
import { removeCurrentUser } from '../reducers/currentUserReducer'
import Notification from './Notification'

const Header = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser)

  const handleLogout = () => {
    dispatch(removeCurrentUser())
    localStorage.removeItem('user')
  }

  useEffect(() => {
    axios.get('/api/blogs').then((response) => {
      dispatch(setBlogs(response.data))
    })
  }, [])

  useEffect(() => {
    axios.get('/api/users').then((response) => {
      dispatch(setUsers(response.data))
    })
  }, [])

  return (
    <header>
      <h1>blogs</h1>
      <Notification />
      <div>
        <div>
          <Link to="/" style={{ marginRight: 10 }}>
            blogs
          </Link>
          <Link to="/users">users</Link>
        </div>
        <br />
        <span>{currentUser.name ?? currentUser.username} logged in </span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </header>
  )
}

export default Header
