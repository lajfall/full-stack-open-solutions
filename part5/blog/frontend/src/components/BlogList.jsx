import BlogDetails from './BlogDetails'

const BlogList = ({ user, blogs, setBlogs }) => {
  if (!blogs) {
    return null
  }

  const sortedBlogs = [...blogs]
  sortedBlogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedBlogs.map((b) => (
        <BlogDetails key={b.id} user={user} blog={b} setBlogs={setBlogs} />
      ))}
    </div>
  )
}

export default BlogList
