import React from 'react'

import { render, screen } from '@testEnv/utils'

import { Header } from './Header'

jest.mock('./components/DateRangeFilter', () => ({
  DateRangeFilter: () => <span>DateRangeFilter</span>,
}))

describe('<Header />', () => {
  const renderHeader = () => render(<Header />)

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render header title', async () => {
    renderHeader()

    expect(screen.getByText('Операции')).toBeInTheDocument()
  })

  test('render "Date range filters"', async () => {
    renderHeader()

    expect(screen.getByText('DateRangeFilter')).toBeInTheDocument()
  })
})
