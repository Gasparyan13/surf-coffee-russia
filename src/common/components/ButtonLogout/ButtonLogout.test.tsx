import React from 'react'

import { ButtonLogout } from '@components'

import { fireEvent, render, screen, waitFor } from '@testEnv/utils'

describe('<ButtonLogout />', () => {
  const renderButtonLogout = () => render(<ButtonLogout />)

  const { location } = window

  const locationMock = {
    reload: jest.fn(),
  }

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: locationMock,
    })
  })

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      value: location,
    })
  })

  it('should render buttonLogout', () => {
    renderButtonLogout()

    expect(screen.getByRole('button', { name: 'Выход' }))
  })

  it('should render confirmation dialog when click to button', async () => {
    const { user, getByText } = renderButtonLogout()

    await user.click(getByText('Выход'))

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()

    const titleDialog = screen.getByText('Выйти из аккаунта?')
    expect(titleDialog).toBeInTheDocument()

    const textSuccess = screen.getByText('Выйти')
    expect(textSuccess).toBeInTheDocument()

    const textCancel = screen.getByText('Назад')
    expect(textCancel).toBeInTheDocument()
  })

  it('should render authorization page while success logout', async () => {
    const { getByText } = renderButtonLogout()

    fireEvent.click(getByText('Выход'))
    fireEvent.click(getByText('Выйти'))

    expect(localStorage.clear).toHaveBeenCalledTimes(1)
    expect(sessionStorage.clear).toHaveBeenCalledTimes(1)
    expect(window.location.reload).toHaveBeenCalledTimes(1)
  })

  it('should close dialog while click cancel button', async () => {
    const { getByText } = renderButtonLogout()

    fireEvent.click(getByText('Выход'))
    fireEvent.click(getByText('Назад'))

    await waitFor(async () => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
})
