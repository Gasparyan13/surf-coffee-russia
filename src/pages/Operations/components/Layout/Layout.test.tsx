import React from 'react'

import { render } from '@testEnv/utils'

import { Layout } from './Layout'

jest.mock('../Header/Header', () => ({
  Header: () => <div>operations</div>,
}))

const CONTENT_TEST = 'operations table'

describe('<Layout />', () => {
  const renderLayout = () => render(<Layout>{CONTENT_TEST}</Layout>)

  it('should render header', async () => {
    const { getByText } = renderLayout()

    expect(getByText('operations')).toBeInTheDocument()
  })

  it('should render correct content', async () => {
    const { getByText } = renderLayout()

    expect(getByText(CONTENT_TEST)).toBeInTheDocument()
  })
})
