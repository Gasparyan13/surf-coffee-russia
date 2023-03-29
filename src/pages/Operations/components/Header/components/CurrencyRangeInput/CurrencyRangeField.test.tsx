import React from 'react'

import { theme } from '@common/providers/ThemeProvider/theme'

import { fireEvent, render, screen } from '@testEnv/utils'

import { CurrencyRangeField } from './CurrencyRangeField'
import { Props } from './CurrencyRangeField.types'

describe('<CurrencyRangeField />', () => {
  const renderCurrencyRangeField = ({
    value = {},
    onChange = () => {},
    error,
    helperText,
    labelText,
    disabled,
  }: Partial<Props>) =>
    render(
      <CurrencyRangeField
        disabled={disabled}
        error={error}
        helperText={helperText}
        labelText={labelText}
        value={value}
        onChange={onChange}
      />,
    )

  afterAll(() => {
    jest.resetAllMocks()
  })

  test('render two inputs on the page', async () => {
    renderCurrencyRangeField({})

    expect(screen.getByPlaceholderText('от')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('до')).toBeInTheDocument()
  })

  test('render correct label text', async () => {
    renderCurrencyRangeField({ labelText: 'test label' })

    expect(screen.getByText('test label')).toBeInTheDocument()
  })

  test('render correct helper text', async () => {
    renderCurrencyRangeField({ helperText: 'test helper' })

    expect(screen.getByText('test helper')).toBeInTheDocument()
  })

  describe('when error', () => {
    it('should add red color to helper text if has error', async () => {
      renderCurrencyRangeField({ helperText: 'test helper', error: true })

      expect(screen.getByText('test helper')).toBeInTheDocument()
      expect(screen.getByText('test helper')).toHaveStyleRule(
        'color',
        theme.colors.critical,
      )
    })

    it('should NOT add red color to helper text if has NO error', async () => {
      renderCurrencyRangeField({ helperText: 'test helper', error: false })

      expect(screen.getByText('test helper')).toBeInTheDocument()
      expect(screen.getByText('test helper')).toHaveStyleRule(
        'color',
        theme.colors.wetAsphalt,
      )
    })
  })

  describe('when disabled', () => {
    it('should disable inputs', async () => {
      renderCurrencyRangeField({
        disabled: true,
      })

      expect(screen.getByPlaceholderText('от')).toBeDisabled()
      expect(screen.getByPlaceholderText('до')).toBeDisabled()
    })

    it('should change "helperText" color if disabled', async () => {
      renderCurrencyRangeField({
        helperText: 'test helper',
        disabled: true,
      })

      expect(screen.getByText('test helper')).toBeInTheDocument()
      expect(screen.getByText('test helper')).toHaveStyleRule(
        'color',
        theme.colors.pencil,
      )
    })

    it('should change "labelText" color if disabled', async () => {
      renderCurrencyRangeField({
        labelText: 'test label',
        disabled: true,
      })

      expect(screen.getByText('test label')).toBeInTheDocument()
      expect(screen.getByText('test label')).toHaveStyle(
        `color: ${theme.colors.pencil}`,
      )
    })
  })

  describe('when change inputs', () => {
    it('should call change "min" input', async () => {
      const mockOnChange = jest.fn()

      renderCurrencyRangeField({
        onChange: mockOnChange,
      })

      fireEvent.change(screen.getByPlaceholderText('от'), {
        target: { value: '100' },
      })

      expect(mockOnChange).toHaveBeenCalledWith({
        min: '100',
      })
    })

    it('should call change "max" input', async () => {
      const mockOnChange = jest.fn()

      renderCurrencyRangeField({
        onChange: mockOnChange,
      })

      fireEvent.change(screen.getByPlaceholderText('до'), {
        target: { value: '200' },
      })

      expect(mockOnChange).toHaveBeenCalledWith({
        max: '200',
      })
    })
  })
})
