import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Popup from './components/Popup'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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
  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const res = await blogService.create(blogObject)
    setBlogs(blogs.concat(res))
    setMessage(`added a new blog ${res.title} by ${res.author}`)
    setTimeout(() => setMessage(null), 5000)
  }
  const likeBlog = async (blogObject) => {
    const updatedBlog = {...blogObject, likes: blogObject.likes + 1, user: blogObject.user._id}
    const res = await blogService.update(updatedBlog)
    const pos = blogs.indexOf(blogObject)
    blogObject.likes = blogObject.likes + 1
    setMessage(`liked blog ${res.title} by ${res.author}`)
    setTimeout(() => setMessage(null), 5000)
  }
  
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
    <div>
      <h1>blogs</h1>
        <p>
          logged in as {JSON.parse(window.localStorage.loggedBlogger).username}
          <button onClick={handleLogout}>logout</button>
        </p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
        )}
    </div>
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
