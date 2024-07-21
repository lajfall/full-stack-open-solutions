import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducers/filterSlice'
import anecdoteReducer from './reducers/anecdotesSlice'
import notificationReducer from './reducers/notificationSlice'

const store = configureStore({
  reducer: {
    filter: filterReducer,
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
  },
})

export default store
