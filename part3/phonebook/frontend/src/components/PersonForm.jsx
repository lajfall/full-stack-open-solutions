const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:{' '}
        <input
          required
          value={newName}
          onChange={({ target }) => setNewName(target.value)}
        />
      </div>
      <div>
        number:{' '}
        <input
          required
          type="tel"
          value={newNumber}
          onChange={({ target }) => setNewNumber(target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
