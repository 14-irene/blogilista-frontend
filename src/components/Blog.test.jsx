import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const user = { username: 'testUser', name: 'root' }
  const blog = {
    title: 'testing blogs',
    author: 'ann b. author',
    url: 'example.url',
    user: user
  }
  const mockHandler = vi.fn()
  let container 

  beforeEach(() => {
    container = render(
      <Blog blog={blog} likeBlog={mockHandler} removeBlog={mockHandler} loggedUser={user} />
    ).container
  })

  test('renders title and author', () => {
    const element = screen.getByText('testing blogs ann b. author')
  })

  test('doesn\'t render url, likes or user by default', () => {
    const element = screen.queryByText('i hope nothing renders')  
    expect(element).toBeNull()
  })
})
