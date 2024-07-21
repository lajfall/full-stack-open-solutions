import store from './store'

const App = () => {
  const { good, ok, bad } = store.getState()

  return (
    <div>
      <div>
        <button onClick={() => store.dispatch({ type: 'GOOD' })}>good</button>
        <button onClick={() => store.dispatch({ type: 'OK' })}>ok</button>
        <button onClick={() => store.dispatch({ type: 'BAD' })}>bad</button>
        <button onClick={() => store.dispatch({ type: 'ZERO' })}>
          reset stats
        </button>
      </div>
      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
    </div>
  )
}

export default App
