import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const testUser = { username: 'testUser', name: 'root' }
  const blog = {
    title: 'testing blogs',
    author: 'ann b. author',
    url: 'example.url',
    likes: 2,
    user: testUser
  }
  const mockHandler = vi.fn()
  let container 

  beforeEach(() => {
    container = render(
      <Blog blog={blog} likeBlog={mockHandler} removeBlog={mockHandler} loggedUser={testUser} />
    ).container
  })

  test('renders title and author', () => {
    const element = screen.getByText('testing blogs ann b. author')
  })

  test('doesn\'t render url, likes or user by default', () => {
    const element = screen.queryByText('example.url')  
    console.log(element)
    expect(element).toBeNull()
  })

  test('renders url, likes and user when view button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const element = screen.getByText(/example.url*likes 2*root*/)

  })
})
