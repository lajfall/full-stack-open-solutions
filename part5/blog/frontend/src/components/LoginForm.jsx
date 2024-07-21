import axios from 'axios'
import Notification from './Notification'

const LoginForm = ({ setUser, message, setMessage }) => {
  const url = '/api/login'

  const handleLogin = async (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    try {
      const response = await axios.post(url, { username, password })

      if (response) {
        const user = response.data
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
      }
    } catch (error) {
      setMessage('wrong username or password')
      setTimeout(() => setMessage(null), 3000)
    }
  }

  return (
    <div>
      <h1>log in to application</h1>
      <Notification message={message} />
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
