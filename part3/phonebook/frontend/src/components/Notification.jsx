const Notification = ({ message }) => {
  const successStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 2,
    borderColor: 'green',
    marginBottom: 5,
    color: 'green',
    fontWeight: 'bold',
  }

  const errorStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 2,
    marginBottom: 5,
    color: 'red',
    borderColor: 'red',
    fontWeight: 'bold',
  }

  if (message?.error) {
    return (
      <div style={errorStyle} className="error">
        {message.error}
      </div>
    )
  }

  if (message?.success) {
    return (
      <div style={successStyle} className="success">
        {message.success}
      </div>
    )
  }

  return null
}

export default Notification
