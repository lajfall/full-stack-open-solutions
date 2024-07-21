import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserList = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <h2>Users</h2>
      {users && (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.name ?? u.username}</Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UserList
