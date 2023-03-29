import React from 'react'

import { CurrencyField } from '@uiKit'
import { TEST_ID_ICON_CURRENCY } from '@uiKit/components/FieldInputs/CurrencyField/constants/testIds'

import { fireEvent, render, screen } from '@testEnv/utils'

import * as T from './CurrencyField.types'

const mockOnChange = jest.fn()

const propsValue: T.Props = {
  name: 'currencyFieldName',
  onChange: mockOnChange,
}

describe('<CurrencyField/>', () => {
  const renderCurrencyField = (props = propsValue) =>
    render(<CurrencyField {...props} />)

  it('should render currency input ', () => {
    renderCurrencyField({ ...propsValue })

    const currencyInput = screen.getByRole('textbox')
    expect(currencyInput).toBeInTheDocument()
  })

  it('should render currency icon', () => {
    renderCurrencyField({ ...propsValue })

    expect(screen.getByTestId(TEST_ID_ICON_CURRENCY)).toBeInTheDocument()
  })

  it('should only allow numbers to be entered', () => {
    renderCurrencyField({ ...propsValue })
    const valueText = 'text'
    const valueNumber = '10'

    const currencyInput = screen.getByRole('textbox')

    fireEvent.change(currencyInput, { target: { value: valueText } })
    expect(currencyInput).not.toHaveValue(valueText)

    fireEvent.change(currencyInput, { target: { value: valueNumber } })
    expect(currencyInput).toHaveValue(valueNumber)
  })

  it('should currencyField be disabled if disabled prop is true', () => {
    renderCurrencyField({
      ...propsValue,
      disabled: true,
    })
    const currencyInput = screen.getByRole('textbox')
    expect(currencyInput).toBeDisabled()
  })

  it('should render label and helperText', () => {
    renderCurrencyField({
      ...propsValue,
      label: 'test label',
      helperText: 'test helper',
    })

    const label = screen.getByLabelText('test label')
    const helperText = screen.getByText('test helper')

    expect(label).toBeInTheDocument()
    expect(helperText).toBeInTheDocument()
  })
})
