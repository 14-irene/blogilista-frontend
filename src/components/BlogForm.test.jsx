import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { testBlog, testUser } from './helpers'

describe('<BlogForm />', () => {
  const createMock = vi.fn()
  let container 

  beforeEach(() => {
    render(<BlogForm createBlog={createMock} />)
  })
  
  test('calls createBlog with correct info', async () => {
    const user = userEvent.setup()
    const title = screen.getByPlaceholderText('enter title')
    const author = screen.getByPlaceholderText('enter author')
    const url = screen.getByPlaceholderText('enter url')
    const create = screen.getByText('create')

    await userEvent.type(title, testBlog.title)
    await userEvent.type(author, testBlog.author)
    await userEvent.type(url, testBlog.url)
    await user.click(create)

    expect(createMock.mock.calls).toHaveLength(1)
    expect(testBlog).toMatchObject(createMock.mock.calls[0][0])

  })

})
