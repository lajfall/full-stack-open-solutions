import { useState } from 'react'
import BlogList from './BlogList'
import NewBlog from './NewBlog'
import TogglePanel from './TogglePanel'

const HomePage = () => {
  const [showBlogForm, setShowBlogForm] = useState(false)

  return (
    <div>
      <br />
      <TogglePanel showContent={showBlogForm} setShowContent={setShowBlogForm}>
        <NewBlog setShowBlogForm={setShowBlogForm} />
      </TogglePanel>
      <br />
      <BlogList />
    </div>
  )
}

export default HomePage
