import { createSlice } from '@reduxjs/toolkit'
import { create, getAll } from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes: (state, action) => {
      return action.payload
    },
    voteAnecdote: (state, action) => {
      const match = state.find((a) => a.id === action.payload)
      match.votes++
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
  },
})

export const { setAnecdotes, voteAnecdote, appendAnecdote } =
  anecdotesSlice.actions

export const getInitialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await create(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export default anecdotesSlice.reducer
