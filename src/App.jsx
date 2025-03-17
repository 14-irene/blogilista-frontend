import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Popup from './components/Popup'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedBloggerJSON = window.localStorage.getItem('loggedBlogger')
    if (loggedBloggerJSON) {
      const user = JSON.parse(loggedBloggerJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setMessage('logged out')
    setTimeout(() => setMessage(null), 5000)
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogger', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setMessage(`logged in as ${user.username}`)
      setTimeout(() => setMessage(null), 5000)
      setUsername('')
      setPassword('')
      console.log(`logged in as ${user.username}`)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }
  
  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const res = await blogService.create(newBlog)
      setBlogs(blogs.concat(res))
      setMessage(`added a new blog ${res.title} by ${res.author}`)
      setTimeout(() => setMessage(null), 5000)
      console.log('added new blog')
    } catch {
      setErrorMessage('failed to add blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }
  
  const newBlogForm = () => (
    <>
      <div>
        title:
        <input type='text' value={newBlog.title} name='title' 
          onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}/>
      </div>
      <div>
        author:
        <input type='text' value={newBlog.author} name='author'
          onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}/>
      </div>
      <div>
        url:
        <input type='text' value={newBlog.url} name='url'
          onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}/>
      </div>
      <button type='submit'form='blogList'>create</button>
    </>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username 
          <input type='text' value={username} name='username'
            onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password 
          <input type='password' value={password} name='password'
            onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const blogList = () => (
    <form onSubmit={handleNewBlog} onReset={handleLogout} id='blogList'>
      <h1>blogs</h1>
        <p>
          logged in as {JSON.parse(window.localStorage.loggedBlogger).username}
          <button type='reset'>logout</button>
        </p>
      <h2>create new</h2>
        {newBlogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </form>
  )


  return (
    <div>
      <Popup text={errorMessage} color='red'/>
      <Popup text={message} color='green'/>
      {!user && loginForm()}
      {user && blogList()}      
    </div>
  )
}

export default App
