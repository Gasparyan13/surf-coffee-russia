import React from 'react'

import { fireEvent, render, screen } from '@testEnv/utils'

import { SearchField } from './SearchField'
import * as T from './SearchField.types'
import { TEST_ID_ICON_SEARCH } from './constants/testIds'

describe('<SearchField/>', () => {
  const renderSearchField = ({ value, onChange, ...rest }: Partial<T.Props>) =>
    render(<SearchField {...rest} value={value} onChange={onChange} />)

  test('render input', () => {
    renderSearchField({})

    expect(screen.getByPlaceholderText('Поиск')).toBeInTheDocument()
  })

  test('render search icon', () => {
    renderSearchField({})

    expect(screen.getByTestId(TEST_ID_ICON_SEARCH)).toBeInTheDocument()
  })

  test('render label', () => {
    renderSearchField({
      label: 'test label',
    })

    expect(screen.getByLabelText('test label')).toBeInTheDocument()
  })

  test('render helperText', () => {
    renderSearchField({
      helperText: 'test helper',
    })

    expect(screen.getByText('test helper')).toBeInTheDocument()
  })

  it('should render reset button if has value', () => {
    renderSearchField({
      value: 'test',
    })

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  describe('when "disabled"', () => {
    it('should disable input component if "disabled" prop is "true"', () => {
      renderSearchField({
        disabled: true,
      })

      expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('should disable reset button if "disabled" prop is "true"', () => {
      renderSearchField({
        disabled: true,
        value: 'test',
      })

      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  it('should call "onChange" with delay', () => {
    jest.useFakeTimers()

    const mockOnChange = jest.fn()

    renderSearchField({ onChange: mockOnChange })

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })

    expect(mockOnChange).toHaveBeenCalledTimes(0)

    jest.runAllTimers()

    expect(mockOnChange).toHaveBeenCalledTimes(1)

    jest.useRealTimers()
  })
})
