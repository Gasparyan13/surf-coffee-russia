import React from 'react'

import { theme } from '@providers/ThemeProvider/theme'

import { SelectSingle } from '@uiKit'
import { TEST_ID_ARROW } from '@uiKit/components/SelectSingle/constants/testIds'

import { fireEvent, render, screen, waitFor } from '@testEnv/utils'

import * as T from './SelectSingle.types'

const PLACEHOLDER_TEST = 'test placeholder'

const itemsSelect = [
  {
    key: '1',
    value: 'test_1',
    text: 'Опция №1',
  },
  {
    key: '2',
    value: 'test_2',
    text: 'Опция №2',
  },
]
describe('<SelectSingle/>', () => {
  const renderSelectSingle = ({
    menus = itemsSelect,
    placeholder,
    value = '',
    helperText,
    labelText,
    onChange,
    disabled,
  }: Partial<T.Props>) =>
    render(
      <SelectSingle
        disabled={disabled}
        helperText={helperText}
        labelText={labelText}
        menus={menus}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />,
    )

  it('should render selectSingle', () => {
    renderSelectSingle({})

    const select = screen.getByRole('button')
    expect(select).toBeInTheDocument()
  })

  it('should render selectSingle icon', () => {
    renderSelectSingle({})

    expect(screen.getByTestId(TEST_ID_ARROW)).toBeInTheDocument()
  })

  it('should render items option', async () => {
    renderSelectSingle({})

    const select = screen.getByRole('button')
    fireEvent.mouseDown(select)

    await waitFor(() => {
      expect(screen.getAllByRole('option').length).toBe(2)
    })

    const options = screen.getAllByRole('option')
    expect(options[0]).toHaveTextContent('Опция №1')
    expect(options[1]).toHaveTextContent('Опция №2')
  })

  it('should render labelText', () => {
    renderSelectSingle({ labelText: 'label text' })

    const label = screen.getByText('label text')
    expect(label).toBeInTheDocument()
  })

  it('should render helperText ', () => {
    renderSelectSingle({ helperText: 'helper text' })

    const helper = screen.getByText('helper text')
    expect(helper).toBeInTheDocument()
  })

  it('should select be disabled if disabled prop is true ', () => {
    renderSelectSingle({
      disabled: true,
      placeholder: PLACEHOLDER_TEST,
      labelText: 'label text',
    })

    const placeholder = screen.getByText(PLACEHOLDER_TEST)
    const label = screen.getByText('label text')

    expect(placeholder).toHaveStyle(`color: ${theme.colors.pencil}`)
    expect(label).toHaveStyle(`color: ${theme.colors.pencil}`)
  })
})
