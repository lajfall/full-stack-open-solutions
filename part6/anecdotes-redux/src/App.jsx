import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import NewAnecdote from './components/NewAnecdote'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default App
