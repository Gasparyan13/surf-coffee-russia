import React from 'react'

import { render, screen } from '@testEnv/utils'

import { RadioButton } from './RadioButton'
import * as T from './RadioButton.types'

const mockOnChange = jest.fn()

const propsValue: T.Props = {
  name: 'test',
  id: '1',
  label: 'Label',
  onChange: mockOnChange,
}

describe('<RadioButton />', () => {
  const renderRadioButton = (props = propsValue) =>
    render(<RadioButton {...props} />)

  it('should render radio button with required props', () => {
    renderRadioButton()

    const radio = screen.getByRole('radio')

    expect(radio).toBeInTheDocument()
    expect(radio).not.toBeChecked()
    expect(radio).toBeEnabled()
    expect(radio).toHaveAttribute('name', 'test')
    expect(radio).toHaveAttribute('id', '1')
    expect(screen.getByLabelText('Label')).toBeInTheDocument()
  })

  it('should radio button be disabled if disabled is true', () => {
    renderRadioButton({
      ...propsValue,
      disabled: true,
    })

    expect(screen.getByRole('radio')).toBeDisabled()
  })

  it('should radio button be checked if defaultChecked is true', () => {
    renderRadioButton({
      ...propsValue,
      defaultChecked: true,
    })

    expect(screen.getByRole('radio')).toBeChecked()
  })

  it('should call onChange callback if radio button was clicked', async () => {
    const { user } = renderRadioButton({
      ...propsValue,
      onChange: mockOnChange,
    })

    const radionButton = screen.getByRole('radio')

    await user.click(radionButton)

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(radionButton).toBeChecked()
  })

  it('should add "error" className if has errors', () => {
    renderRadioButton({
      ...propsValue,
      error: true,
    })

    const radio = screen.getByRole('radio')

    expect(radio).toHaveClass('Mui-error')
  })

  it('should NOT add "error" className if no errors', () => {
    renderRadioButton()

    const radio = screen.getByRole('radio')

    expect(radio).not.toHaveClass('Mui-error')
  })
})
