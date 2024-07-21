import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './contexts/notificationContext'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <h1>Anecdote app</h1>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList />
      </NotificationContextProvider>
    </QueryClientProvider>
  )
}

export default App
