import React from 'react'

import { render } from '@testEnv/utils'

import { Layout } from './Layout'

jest.mock('../Header', () => ({
  Header: () => <div>header</div>,
}))

const TEST_CONTENT = 'test'

describe('<Layout />', () => {
  const renderLayout = () => render(<Layout>{TEST_CONTENT}</Layout>)

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('render correct content', async () => {
    const { getByText } = renderLayout()

    expect(getByText(TEST_CONTENT)).toBeInTheDocument()
  })

  test('render header', async () => {
    const { getByText } = renderLayout()

    expect(getByText('header')).toBeInTheDocument()
  })
})
