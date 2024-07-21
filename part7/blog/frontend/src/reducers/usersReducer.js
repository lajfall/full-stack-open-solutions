import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUsers: (_, { payload }) => {
      return payload
    },
  },
})

export const { setUsers } = usersSlice.actions

export default usersSlice.reducer
