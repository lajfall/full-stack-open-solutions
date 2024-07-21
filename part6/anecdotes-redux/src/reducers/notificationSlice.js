import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (_, action) => {
      return action.payload
    },
    removeNotification: () => {
      return null
    },
  },
})

const { setNotification, removeNotification } = notificationSlice.actions

export const notify = (message, duration) => {
  return (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => dispatch(removeNotification()), duration * 1000)
  }
}

export default notificationSlice.reducer
