import { createSlice } from '@reduxjs/toolkit'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: null,
  reducers: {
    setBlogs: (_, { payload }) => {
      return payload
    },
    addBlog: (state, { payload }) => {
      return state.concat(payload)
    },
    updateBlog: (state, { payload }) => {
      const { id } = payload
      return state.map((b) => (b.id === id ? payload : b))
    },
    deleteBlog: (state, { payload }) => {
      return state.filter((b) => b.id !== payload)
    },
  },
})

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogsSlice.actions

export default blogsSlice.reducer
