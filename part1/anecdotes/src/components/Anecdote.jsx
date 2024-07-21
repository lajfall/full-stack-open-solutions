const Anecdote = ({ anecdote, points }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {points} votes</p>
    </>
  )
}

export default Anecdote
