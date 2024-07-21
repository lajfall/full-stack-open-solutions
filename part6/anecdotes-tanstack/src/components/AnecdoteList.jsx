import axios from 'axios'
import { useContext } from 'react'
import NotificationContext from '../contexts/notificationContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const AnecdoteList = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)

  const { isPending, error, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3001/anecdotes')
      return response.data
    },
    retry: false,
  })

  const mutation = useMutation({
    mutationFn: async ({ id, content, votes }) => {
      const response = await axios.put(
        `http://localhost:3001/anecdotes/${id}`,
        { id, content, votes: votes + 1 }
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    mutation.mutate(anecdote)

    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: `${anecdote.content} voted`,
    })

    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  if (isPending) {
    return 'Loading...'
  }

  if (error) {
    return 'something wrong'
  }

  return (
    <div>
      {data.map((a) => (
        <div key={a.id} style={{ margin: 10 }}>
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
