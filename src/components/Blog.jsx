import { useState, forwardRef } from 'react'
import PropTypes from 'prop-types'

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

  const [showConfirm, setShowConfirm] = useState(false)
  const togRemove = (event) => { 
    event.preventDefault()
    setShowConfirm(!showConfirm) }

  const showRemove = blog.user.username === loggedUser.username

  const addLike = (event) => {
    event.preventDefault()
    likeBlog(blog)
  }
  const delBlog = (event) => {
    event.preventDefault()
    removeBlog(blog)
  }
  const RemoveButton = () => { 
    if (!showConfirm) {
      return(<><button type='button' onClick={togRemove}>remove</button></>)
    } else {
      return(<><button type='button' onClick={delBlog}>yes</button>
        <button type='button' onClick={togRemove}>no</button></>)
    }
  }

  const FullBlog = () => (
    <div id='full-blog'>
      {blog.url}<br/>
      likes {blog.likes}
      <button type='button' onClick={addLike} data-testid='like'>like</button><br/>
      {blog.user.name}
      {showRemove && RemoveButton()}
    </div>
  )

  return(
    <div style={blogStyle}>
      {blog.title} {blog.author} <button type='button' onClick={togVis} data-testid='view'>{vis ? 'hide' : 'view'}</button>
      {vis && FullBlog()}
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired
}

export default Blog
