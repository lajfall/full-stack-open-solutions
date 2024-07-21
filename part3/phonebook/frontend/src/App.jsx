import { useState, useEffect } from 'react'
import { create, getAll, remove, update } from './lib/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    getAll()
      .then((persons) => {
        setPersons(persons)
      })
      .catch((error) => {
        console.log(error.message)
        setMessage({ error: 'Failed to fetch persons' })
        setTimeout(() => setMessage(null), 3000)
      })
  }, [])

  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (newName.trim() === '') {
      return
    }

    const match = persons.find((p) => p.name === newName)

    if (!match) {
      return create({ name: newName, number: newNumber })
        .then((person) => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
          setMessage({ success: `Added ${person.name}` })
          setTimeout(() => setMessage(null), 3000)
        })
        .catch((error) => {
          console.log(error.message)
          setMessage({ error: error.response.data.error })
          setTimeout(() => setMessage(null), 3000)
        })
    }

    if (confirm(`Update ${match.name}'s number?`)) {
      update(match.id, { ...match, number: newNumber })
        .then((updatedPerson) => {
          setPersons(
            persons.map((p) => (p.id === match.id ? updatedPerson : p))
          )
          setNewName('')
          setNewNumber('')
          setMessage({ success: `Updated ${match.name}'s number` })
          setTimeout(() => setMessage(null), 3000)
        })
        .catch((error) => {
          console.log(error.message)
          setMessage({ error: `Failed to update ${match.name}'s number` })
          setTimeout(() => setMessage(null), 3000)
        })
    }
  }

  const handleDelete = async (id) => {
    const match = persons.find((p) => p.id === id)

    if (match && confirm(`Delete ${match.name}?`)) {
      remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id))
          setMessage({ success: `Deleted ${match.name}` })
          setTimeout(() => setMessage(null), 3000)
        })
        .catch((error) => {
          console.log(error.message)
          setMessage({
            error: `Failed to delete ${match.name}`,
          })
          setTimeout(() => setMessage(null), 3000)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        onSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  )
}

export default App
