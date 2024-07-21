import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification: (_, { payload }) => {
      return payload
    },
    removeNotification: () => {
      return null
    },
  },
})

const { showNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, duration) => {
  return (dispatch) => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, duration * 1000)
  }
}

export default notificationSlice.reducer
