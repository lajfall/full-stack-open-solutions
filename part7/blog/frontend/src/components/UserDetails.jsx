import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserDetails = () => {
  const match = useMatch('/users/:id')
  const { id } = match.params
  const user = useSelector((state) => state?.users?.find((u) => u.id === id))

  if (user)
    return (
      <div>
        <h2>{user.name ?? user.username}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map((b) => (
            <li key={b.id}>{b.title}</li>
          ))}
        </ul>
      </div>
    )
}

export default UserDetails
