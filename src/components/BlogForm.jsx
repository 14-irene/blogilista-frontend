import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})
  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({title: '', author: '', url: ''})
  }
  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={addBlog}>
        title:
        <input type='text' value={newBlog.title} name='title'
          onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}/>
        author:
        <input type='text' value={newBlog.author} name='author'
          onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}/>
        url:
        <input type='text' value={newBlog.url} name='url'
          onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}/>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm


  
