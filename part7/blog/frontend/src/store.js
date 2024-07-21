import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogsReducer'
import currentUserReducer from './reducers/currentUserReducer'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    users: usersReducer,
    blogs: blogsReducer,
    currentUser: currentUserReducer,
    notification: notificationReducer,
  },
})

export default store
