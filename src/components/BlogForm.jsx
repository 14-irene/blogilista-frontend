import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const blankBlog = { title: '', author: '', url: '' }
  const [newBlog, setNewBlog] = useState(blankBlog)
  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog(blankBlog)
  }
  return (
    <div>
      <h2>create a new blog</h2>
      <form onSubmit={addBlog}>
        title:
        <input type='text' value={newBlog.title} name='title' placeholder='enter title' data-testid='title'
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}/>
        author:
        <input type='text' value={newBlog.author} name='author' placeholder='enter author' data-testid='author'
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}/>
        url:
        <input type='text' value={newBlog.url} name='url'placeholder='enter url' data-testid='url'
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}/>
        <button type='submit' data-testid='create'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
