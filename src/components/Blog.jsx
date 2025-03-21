import { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, likeBlog, removeBlog, loggedUser }) => {
  const blogStyle = { 
    border: '1px black',
    borderRadius: '3px',
    borderStyle: 'solid',
    margin: '1px',
    backgroundColor: 'white' 
  }
  const [vis, setVis] = useState(false)
  const togVis = () => { setVis(!vis) }
  
  const showRemove = blog.user.username === loggedUser.username

  const addLike = (event) => {
    event.preventDefault()
    likeBlog(blog)
  }
  const delBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog)
    }
  }
  const RemoveButton = () => (
    <button type='button' onClick={delBlog}>remove</button>
  )
 
  const FullBlog = () => (
    <div>
      {blog.url}<br/>
      likes {blog.likes}<button type='button' onClick={addLike}>like</button><br/>
      {blog.user.name}
      {showRemove && RemoveButton()}
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
