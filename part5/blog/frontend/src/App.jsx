import { useState } from 'react'
import LoginForm from './components/LoginForm'
import HomePage from './components/HomePage'

const App = () => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const [message, setMessage] = useState(null)

  if (user) {
    return (
      <HomePage
        user={user}
        setUser={setUser}
        message={message}
        setMessage={setMessage}
      />
    )
  }

  return (
    <LoginForm setUser={setUser} message={message} setMessage={setMessage} />
  )
}

export default App
