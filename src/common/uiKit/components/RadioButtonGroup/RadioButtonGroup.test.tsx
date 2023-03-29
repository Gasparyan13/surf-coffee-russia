import React from 'react'

import { render, screen } from '@testEnv/utils'

import { RadioButtonGroup } from './RadioButtonGroup'
import * as T from './RadioButtonGroup.types'
import { options } from './mocks/option'

const propsValue: T.Props = {
  name: 'paymentType',
  options,
  label: 'Тип оплаты',
  onChange: jest.fn(),
}

const ERROR_TEXT = 'Не выбран тип оплаты'

describe('<RadioButtonGroup />', () => {
  const renderRadioButtonGroup = (props = propsValue) =>
    render(<RadioButtonGroup {...props} />)

  it('should rendern two radio buttons with required props', () => {
    renderRadioButtonGroup()

    const cashlessRadioButton = screen.getByLabelText('Безналичные')
    const cashRadioButton = screen.getByLabelText('Наличные')
    const fieldset = screen.getByRole('group')

    expect(fieldset).toBeInTheDocument()
    expect(fieldset).toHaveAttribute('name', 'paymentType')
    expect(screen.getByText('Тип оплаты')).toBeInTheDocument()
    expect(cashlessRadioButton).toBeInTheDocument()
    expect(cashRadioButton).toBeInTheDocument()
    expect(cashlessRadioButton).not.toBeChecked()
    expect(cashRadioButton).not.toBeChecked()
    expect(cashlessRadioButton).toBeEnabled()
    expect(cashRadioButton).toBeEnabled()
    expect(screen.queryByText(ERROR_TEXT)).not.toBeInTheDocument()
  })

  it('should rendern error text message if error is true', () => {
    renderRadioButtonGroup({
      ...propsValue,
      error: ERROR_TEXT,
    })

    expect(screen.getByText(ERROR_TEXT)).toBeInTheDocument()
  })

  it('should radio buttons be disabled if disabled is true', () => {
    renderRadioButtonGroup({
      ...propsValue,
      disabled: true,
    })

    expect(screen.getByLabelText('Безналичные')).toBeDisabled()
    expect(screen.getByLabelText('Наличные')).toBeDisabled()
  })

  it('should first radio button be selected if defaultValue was transferred', () => {
    renderRadioButtonGroup({
      ...propsValue,
      defaultValue: 'cashless',
    })

    expect(screen.getByLabelText('Безналичные')).toBeChecked()
    expect(screen.getByLabelText('Наличные')).not.toBeChecked()
  })

  it('should second radio button be selected if it was clicked', async () => {
    const { user } = renderRadioButtonGroup()

    const cashlessRadioButton = screen.getByLabelText('Безналичные')
    const cashRadioButton = screen.getByLabelText('Наличные')

    expect(cashlessRadioButton).not.toBeChecked()
    expect(cashRadioButton).not.toBeChecked()

    await user.click(cashRadioButton)

    expect(cashlessRadioButton).not.toBeChecked()
    expect(cashRadioButton).toBeChecked()
  })
})
