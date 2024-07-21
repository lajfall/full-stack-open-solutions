import { createSlice } from '@reduxjs/toolkit'

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: null,
  reducers: {
    setCurrentUser: (_, { payload }) => {
      return payload
    },
    removeCurrentUser: () => {
      return null
    },
  },
})

export const { setCurrentUser, removeCurrentUser } = currentUserSlice.actions

export default currentUserSlice.reducer
