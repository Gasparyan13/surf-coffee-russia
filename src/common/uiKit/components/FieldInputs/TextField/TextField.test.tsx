import React from 'react'

import { TextField } from '@uiKit'

import { render, screen, fireEvent } from '@testEnv/utils'

import * as T from './TextField.types'

describe('<TextField/>', () => {
  const renderTextField = ({
    placeholder,
    labelText,
    helperText,
    disabled,
  }: Partial<T.Props>) =>
    render(
      <TextField
        disabled={disabled}
        helperText={helperText}
        labelText={labelText}
        placeholder={placeholder}
      />,
    )

  it('should render textField ', () => {
    renderTextField({})

    const textField = screen.getByRole('textbox')
    expect(textField).toBeInTheDocument()
  })

  it('should render textField placeholder ', () => {
    renderTextField({ placeholder: 'test placeholder' })

    expect(screen.getByPlaceholderText('test placeholder')).toBeInTheDocument()
  })

  it('should correctly change value textField ', () => {
    renderTextField({})

    const textField = screen.getByRole('textbox')

    fireEvent.change(textField, { target: { value: 'test value' } })
    expect(textField).toHaveValue('test value')
  })

  it('should render helperText and label ', () => {
    renderTextField({
      labelText: 'test label',
      helperText: 'test helper',
    })

    const helperText = screen.getByText('test helper')
    const label = screen.getByText('test label')

    expect(label).toBeInTheDocument()
    expect(helperText).toBeInTheDocument()
  })

  it('should textField be disabled if disabled prop is true', () => {
    renderTextField({
      disabled: true,
    })

    const textField = screen.getByRole('textbox')

    expect(textField).toBeDisabled()
  })
})
