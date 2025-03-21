import { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog }) => {
  const blogStyle = { 
    border: '1px black',
    borderRadius: '3px',
    borderStyle: 'solid',
    margin: '1px',
    backgroundColor: 'white' 
  }
  const [vis, setVis] = useState(false)
  const togVis = () => { setVis(!vis) }
  
  const FullBlog = () => (
    <div>
      {blog.url}<br/>
      likes {blog.likes}<button type='button'>like</button><br/>
      {blog.user.name}
    </div>
  )

  return(
    <div style={blogStyle}>
      {blog.title} {blog.author} <button type='button' onClick={togVis}>{vis ? 'hide' : 'view'}</button>
      {vis && FullBlog()}
    </div>  
  )
}

export default Blog
