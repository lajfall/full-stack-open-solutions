import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationSlice'
import { createAnecdote } from '../reducers/anecdotesSlice'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(createAnecdote(e.target.anecdote.value))
    dispatch(notify(`you added ${e.target.anecdote.value}`, 5))
    e.target.anecdote.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        <input type="text" name="anecdote" />
      </div>
      <button>create</button>
    </form>
  )
}

export default NewAnecdote
