import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../services/anecdotes'
import { notify } from '../reducers/notificationSlice'
import { voteAnecdote, getInitialAnecdotes } from '../reducers/anecdotesSlice'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  useEffect(() => {
    dispatch(getInitialAnecdotes())
  }, [dispatch])

  const filteredAnecdotes = anecdotes.filter((a) =>
    a.content.toLowerCase().includes(filter.toLowerCase())
  )

  const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)

  const handleVote = ({ id, content, votes }) => {
    update(id, {
      id,
      content,
      votes: votes + 1,
    }).then(() => {
      dispatch(voteAnecdote(id))
      dispatch(notify(`you voted ${content}`, 5))
    })
  }

  return (
    <div>
      {sortedAnecdotes.map((a) => (
        <div key={a.id} style={{ marginTop: '1rem' }}>
          <div>{a.content}</div>
          <div>
            has {a.votes} votes{' '}
            <button onClick={() => handleVote(a)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
