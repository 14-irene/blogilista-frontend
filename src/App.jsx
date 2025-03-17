import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
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
    setUser(null)
    location.reload()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogger', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(`logged in as ${user.username}`)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
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
    <form onReset={handleLogout}>
      <h3>blogs</h3>
        <p>
          logged in as {JSON.parse(window.localStorage.loggedBlogger).username}
          <button type='reset'>logout</button>
        </p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </form>
  )


  return (
    <div>
      {!user && loginForm()}
      {user && blogList()}      
    </div>
  )
}

export default App
