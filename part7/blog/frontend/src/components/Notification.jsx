import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification)

  if (message) {
    return (
      <div>
        <div>{message}</div>
        <br />
      </div>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string,
}

export default Notification
