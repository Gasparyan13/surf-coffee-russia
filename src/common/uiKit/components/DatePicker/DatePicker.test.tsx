import React from 'react'

import { DateHelper } from '@helpers'

import { DatePicker } from '@uiKit'

import { fireEvent, render, screen, waitFor } from '@testEnv/utils'

import * as T from './DatePicker.types'

const today = new Date()
const testDate = new Date('12-12-2022')

const SELECTED_DATE = new Date(today.getFullYear(), today.getMonth(), 15)

const currentDate = DateHelper.toFormat(today)

const currentDayNumber = String(today.getDate()).padStart(2, '0')

describe('<DatePicker />', () => {
  const renderDatePicker = ({
    onChange = () => {},
    value = null,
    labelText,
    disabled,
    helperText,
    disableFuture,
    disablePast,
    inputFormat,
  }: Partial<T.Props>) =>
    render(
      <DatePicker
        disableFuture={disableFuture}
        disablePast={disablePast}
        disabled={disabled}
        helperText={helperText}
        inputFormat={inputFormat}
        labelText={labelText}
        value={value}
        onChange={onChange}
      />,
    )

  describe('when render date input and calendar ', () => {
    it('should render date input', async () => {
      renderDatePicker({})

      const datePicker = screen.getByPlaceholderText(currentDate)

      expect(datePicker).toBeInTheDocument()
    })

    it('should render calendar', async () => {
      renderDatePicker({})

      const datePickerButton = screen.getByRole('button')
      fireEvent.click(datePickerButton)

      await waitFor(async () => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })
  })

  describe('when change date ', () => {
    it('should change value while click day', async () => {
      const mockOnChange = jest.fn()

      const { rerender } = renderDatePicker({ onChange: mockOnChange })

      const datePicker = screen.getByPlaceholderText(currentDate)

      const datePickerButton = screen.getByRole('button')
      fireEvent.click(datePickerButton)

      fireEvent.click(screen.getByText('15'))

      await waitFor(async () => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })

      expect(mockOnChange).toHaveBeenCalledWith(SELECTED_DATE)

      rerender(<DatePicker value={SELECTED_DATE} onChange={mockOnChange} />)

      expect(datePicker).toHaveValue(DateHelper.toLocaleFormat(SELECTED_DATE))
    })

    it('should change year', () => {
      renderDatePicker({})

      const datePickerButton = screen.getByRole('button')
      fireEvent.click(datePickerButton)

      const yearFilter = screen.getAllByRole('button')[1]
      fireEvent.click(yearFilter)

      const year = screen.getByText('2020')
      fireEvent.click(year)

      const month = screen.getByText('Май')
      fireEvent.click(month)

      expect(year).toBeInTheDocument()
      expect(month).toBeInTheDocument()
    })
  })

  describe('when disabled datePicker', () => {
    test('should datePicker disabled if disabled prop is true', async () => {
      renderDatePicker({
        disabled: true,
      })

      const datePicker = screen.getByPlaceholderText(currentDate)

      expect(datePicker).toBeDisabled()

      const datePickerButton = screen.getByRole('button')

      expect(datePickerButton).toBeDisabled()

      fireEvent.click(datePickerButton)

      await waitFor(async () => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('should datePicker disabled future date  if disabledFuture prop is true', async () => {
      renderDatePicker({
        disableFuture: true,
      })

      const datePickerButton = screen.getByRole('button')
      fireEvent.click(datePickerButton)

      const nextDay = screen.getByText(`${Number(currentDayNumber) + 1}`)

      await waitFor(() => {
        expect(nextDay).toBeDisabled()
      })

      const yesterday = screen.queryByText(`${Number(currentDayNumber) + -1}`)

      await waitFor(() => {
        expect(yesterday).toBeEnabled()
      })
    })

    it('should datePicker disabled past date if disablePast prop is true', async () => {
      renderDatePicker({
        disablePast: true,
      })

      const datePickerButton = screen.getByRole('button')
      fireEvent.click(datePickerButton)

      const nextDay = screen.queryByText(`${Number(currentDayNumber) + 1}`)

      await waitFor(() => {
        expect(nextDay).toBeEnabled()
      })

      const yesterday = screen.getByText(`${Number(currentDayNumber) + -1}`)

      await waitFor(() => {
        expect(yesterday).toBeDisabled()
      })
    })
  })

  describe('when render views datepicker', () => {
    it('should render view format "d MMMM, EEEE" ', () => {
      renderDatePicker({
        value: testDate,
        inputFormat: 'd MMMM, EEEE',
      })
      const datePicker = screen.getByPlaceholderText(currentDate)

      expect(datePicker).toHaveValue('12 декабря, понедельник')
    })

    it('should render view format "yyyy"', () => {
      renderDatePicker({
        value: testDate,
        inputFormat: 'yyyy',
      })
      const datePicker = screen.getByPlaceholderText(currentDate)

      expect(datePicker).toHaveValue('2022')
    })
  })

  test('should render datePicker label', async () => {
    renderDatePicker({
      labelText: 'Date',
    })

    expect(screen.getByText('Date')).toBeInTheDocument()
  })

  test('should render datePicker error helper text', async () => {
    renderDatePicker({
      helperText: 'Error message',
    })

    expect(screen.getByText('Error message')).toBeInTheDocument()
  })
})
