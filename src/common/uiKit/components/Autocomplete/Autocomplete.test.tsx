import { createFilterOptions } from '@mui/material/Autocomplete'
import React from 'react'

import { act, fireEvent, render, screen } from '@testEnv/utils'

import { Autocomplete } from './Autocomplete'
import * as T from './Autocomplete.types'
import { EMPTY_RESULTS_PLACEHOLDER } from './constants/placeholder'
import { TEST_ID_CLEAR } from './constants/testIds'

describe('<Autocomplete />', () => {
  const testOptions: T.AutocompleteItem[] = [
    {
      label: 'test 1',
      value: 4,
      key: 'test_1',
    },
    {
      label: 'test 2',
      value: 5,
      key: 'test_2',
    },
  ]

  const filterTestOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option: T.AutocompleteItem) => `${option.label}`,
  })

  const TEST_PLACEHOLDER = 'test placeholder'

  const renderAutocomplete = ({
    options = testOptions,
    filterOptions = filterTestOptions,
    placeholder = TEST_PLACEHOLDER,
    onChange = () => {},
  }: Partial<T.Props<T.AutocompleteItem>>) =>
    render(
      <Autocomplete
        filterOptions={filterOptions}
        options={options}
        placeholder={placeholder}
        onChange={onChange}
      />,
    )

  test('render correct placeholder', async () => {
    const { getByPlaceholderText } = renderAutocomplete({})

    expect(getByPlaceholderText(TEST_PLACEHOLDER)).toContainHTML(
      TEST_PLACEHOLDER,
    )
  })

  test('render all options', async () => {
    renderAutocomplete({})

    const input = screen.getByPlaceholderText(TEST_PLACEHOLDER)

    fireEvent.change(input, {
      target: { value: testOptions[0].label.substring(0, 5) },
    })

    expect(screen.getAllByRole('option').length).toEqual(testOptions.length)
  })

  test('select option', async () => {
    renderAutocomplete({})

    const input = screen.getByPlaceholderText(TEST_PLACEHOLDER)

    fireEvent.change(input, {
      target: { value: testOptions[0].label.substring(0, 5) },
    })

    fireEvent.click(screen.getAllByRole('option')[0])

    expect(screen.getByPlaceholderText(TEST_PLACEHOLDER)).toContainHTML(
      testOptions[0].label,
    )
  })

  test('render "no options" placeholder', async () => {
    const { user } = renderAutocomplete({})

    const input = screen.getByRole('combobox')

    await user.type(input, '9')

    expect(screen.getByText(EMPTY_RESULTS_PLACEHOLDER)).toContainHTML(
      EMPTY_RESULTS_PLACEHOLDER,
    )
  })

  describe('when clear button visible', () => {
    it('should render clear button if variant selected and focused', async () => {
      renderAutocomplete({})

      const input = screen.getByPlaceholderText(TEST_PLACEHOLDER)

      act(() => {
        input.focus()
      })

      fireEvent.change(input, {
        target: { value: testOptions[0].label.substring(0, 5) },
      })
      fireEvent.click(screen.getAllByRole('option')[0])

      expect(screen.getByPlaceholderText(TEST_PLACEHOLDER)).toHaveFocus()
      expect(screen.getByTestId(TEST_ID_CLEAR)).toBeInTheDocument()
    })

    it('should NOT render clear button if variant not selected and not focused', async () => {
      renderAutocomplete({})

      expect(screen.getByPlaceholderText(TEST_PLACEHOLDER)).not.toHaveFocus()
      expect(screen.queryByTestId(TEST_ID_CLEAR)).not.toBeInTheDocument()
    })
  })

  it('should search with custom filter mask', async () => {
    const filterOptions = createFilterOptions({
      matchFrom: 'start',
      stringify: (option: T.AutocompleteItem) => `${option.value}`,
    })

    renderAutocomplete({
      filterOptions,
    })

    const input = screen.getByPlaceholderText(TEST_PLACEHOLDER)

    act(() => {
      input.focus()
    })
    fireEvent.change(input, {
      target: { value: `${testOptions[1].value}` },
    })

    const options = screen.getAllByRole('option')

    expect(options.length).toEqual(1)
    expect(options[0]).toContainHTML(testOptions[1].label)
  })

  it('should make bold text for searching words', async () => {
    const getMarks = (root: HTMLElement) => root.querySelectorAll('mark')

    const { user } = renderAutocomplete({})

    const input = screen.getByPlaceholderText(TEST_PLACEHOLDER)
    const searchMask = 'tes'

    await user.type(input, searchMask)

    const options = screen.getAllByRole('option')
    const marks = getMarks(options[0])

    expect(marks.length).toEqual(1)
  })
})
