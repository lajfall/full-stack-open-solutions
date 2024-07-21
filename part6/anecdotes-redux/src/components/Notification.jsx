import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification) {
    return (
      <div style={{ border: '1px solid', padding: 10, marginBottom: 10 }}>
        {notification}
      </div>
    )
  }
}

export default Notification
