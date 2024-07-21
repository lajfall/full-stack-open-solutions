import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { setCurrentUser } from './reducers/currentUserReducer'
import LoginForm from './components/LoginForm'
import HomePage from './components/HomePage'
import UserList from './components/UserList'
import Header from './components/Header'
import UserDetails from './components/UserDetails'
import BlogPage from './components/BlogPage'

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser)

  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) {
      dispatch(setCurrentUser(JSON.parse(saved)))
    }
  }, [])

  if (currentUser) {
    return (
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
        </Routes>
      </div>
    )
  }

  return <LoginForm />
}

export default App
