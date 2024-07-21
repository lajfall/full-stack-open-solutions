import axios from 'axios'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../reducers/currentUserReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const url = '/api/login'
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value

    try {
      const response = await axios.post(url, { username, password })

      if (response) {
        const user = response.data
        dispatch(setCurrentUser(user))
        localStorage.setItem('user', JSON.stringify(user))
      }
    } catch (error) {
      dispatch(setNotification('wrong username or password', 3))
    }
  }

  return (
    <div>
      <h1>log in to application</h1>
      <Notification />
      <form onSubmit={handleLogin} data-testid="login-form">
        <div>
          <label>username: </label>
          <input required type="text" name="username" data-testid="username" />
        </div>
        <div>
          <label>password: </label>
          <input
            required
            type="password"
            name="password"
            data-testid="password"
          />
        </div>
        <button data-testid="login">login</button>
      </form>
    </div>
  )
}

export default LoginForm
