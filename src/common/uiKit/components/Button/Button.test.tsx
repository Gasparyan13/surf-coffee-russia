import React from 'react'

import { Button } from '@uiKit'

import { render, screen } from '@testEnv/utils'

import * as T from './Button.types'

describe('<Button/>', () => {
  const renderButton = ({
    disabled,
    children = 'text',
    onClick,
  }: Partial<T.Props>) =>
    render(
      <Button color="primary" disabled={disabled} onClick={onClick}>
        {children}
      </Button>,
    )

  it('should render  button ', () => {
    renderButton({})

    const button = screen.getByRole('button', { name: 'text' })
    expect(button).toBeInTheDocument()
  })

  it('should button be disabled if disabled prop is true', () => {
    renderButton({
      disabled: true,
    })
    const button = screen.getByRole('button', { name: 'text' })

    expect(button).toBeDisabled()
  })

  it('should trigger function onClick  button', async () => {
    const mockOnСlick = jest.fn()

    const { user, getByRole } = renderButton({
      onClick: mockOnСlick,
    })

    await user.click(getByRole('button'))

    expect(mockOnСlick).toHaveBeenCalledTimes(1)
  })
})
