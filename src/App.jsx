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
    const getBlogs = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }
    getBlogs()
  }, [setBlogs])

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
  const removeBlog = async (blogObject) => {
    const res = await blogService.remove(blogObject)
    setBlogs(blogs.toSpliced(blogs.indexOf(blogObject), 1))
    setMessage(`removed blog ${blogObject.title} by ${blogObject.author}`)
    setTimeout(() => setMessage(null), 5000)
  }
  const likeBlog = async (blogObject) => {
    const updatedBlog = { ...blogObject, likes: blogObject.likes + 1, user: blogObject.user._id }
    const res = await blogService.update(updatedBlog)
    const pos = blogs.indexOf(blogObject)
    blogObject.likes = blogObject.likes + 1
    setMessage(`liked blog ${res.title} by ${res.author}`)
    setTimeout(() => setMessage(null), 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin} data-testid='loginForm'>
      <div>
        username
        <input type='text' value={username} name='username' data-testid='username'
          onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password
        <input type='password' value={password} name='password' data-testid='password'
          onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type='submit' data-testid='login'>login</button>
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
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} loggedUser={user}/>
      )}
    </div>
  )


  return (
    <div>
      <Popup text={errorMessage} color='red' data-testId='error'/>
      <Popup text={message} color='green'data-testId='logged'/>
      {!user && loginForm()}
      {user && blogList()}
    </div>
  )
}

export default App
