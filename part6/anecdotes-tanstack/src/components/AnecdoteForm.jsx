import axios from 'axios'
import { useContext } from 'react'
import NotificationContext from '../contexts/notificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)

  const mutation = useMutation({
    mutationFn: async (content) => {
      const response = await axios.post('http://localhost:3001/anecdotes', {
        content,
        votes: 0,
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: 'anecdote must be at least 5 characters long',
      })

      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    mutation.mutate(content)
    event.target.anecdote.value = ''

    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: `${content} added`,
    })

    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
