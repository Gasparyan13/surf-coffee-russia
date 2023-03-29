import React from 'react'

import { render, screen } from '@testEnv/utils'

import { Checkbox } from './Checkbox'
import * as T from './Checkbox.types'

const mockOnChange = jest.fn()
const LABEL_TEXT = 'Label'

const propsValue: T.Props = {
  name: 'checkboxName',
  onChange: mockOnChange,
}

describe('<Checkbox />', () => {
  const renderCheckbox = (props = propsValue) => render(<Checkbox {...props} />)

  it('should render checkbox with required props', () => {
    renderCheckbox()

    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toHaveAttribute('name', 'checkboxName')
    expect(checkbox).not.toBeChecked()
    expect(screen.queryByText(LABEL_TEXT)).not.toBeInTheDocument()
    expect(checkbox).toBeEnabled()
  })

  test('should checkbox be disabled if disabled prop is true', () => {
    renderCheckbox({
      ...propsValue,
      disabled: true,
    })

    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  test('should checkbox be checked if checked prop is true', () => {
    renderCheckbox({
      ...propsValue,
      checked: true,
    })

    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  test('should call onChange callback if checkbox was clicked', async () => {
    const { user } = renderCheckbox({
      ...propsValue,
    })

    const checkbox = screen.getByRole('checkbox')

    await user.click(checkbox)

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(checkbox).toBeChecked()
  })

  test('should display label text if label prop was passed', () => {
    renderCheckbox({
      ...propsValue,
      label: 'Label',
    })

    expect(screen.getByText(LABEL_TEXT)).toBeInTheDocument()
  })
})
