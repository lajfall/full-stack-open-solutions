import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  if (!blogs) {
    return null
  }

  const sortedBlogs = [...blogs]
  sortedBlogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedBlogs.map((b) => (
        <div key={b.id}>
          <Link to={`/blogs/${b.id}`}>
            {b.title} {b.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
