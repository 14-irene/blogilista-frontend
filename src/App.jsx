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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogger', JSON.stringify(user))
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
    <>
      <h2>logged in as {JSON.parse(window.localStorage.loggedBlogger).username}</h2>
      <h3>blogs</h3>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </>
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      {!user && loginForm()}
      {user && blogList()}      
    </div>
  )
}

export default App
