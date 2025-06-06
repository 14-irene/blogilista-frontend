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
  const likeMock = vi.fn()
  const removeMock = vi.fn()

  let container 

  beforeEach(() => {
    container = render(
      <Blog blog={blog} likeBlog={likeMock} removeBlog={removeMock} loggedUser={testUser} />
    ).container
  })

  test('renders title and author', () => {
    const element = screen.getByText('testing blogs ann b. author')
  })

  test('doesn\'t render url, likes or user by default', () => {
    const element = screen.queryByText('example.url')  
    expect(element).toBeNull()
  })

  test('renders url, likes and user when view button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const element = screen.getByText(/example.url*likes 2*root*/)

  })
  test('handler is called twice when like is clicked twice', async ()  => {
    const user = userEvent.setup()
    const view = screen.getByText('view')
    await user.click(view)
    const like = screen.getByText('like')
    await user.click(like)
    await user.click(like)
    expect(likeMock.mock.calls).toHaveLength(2)
  })
})
