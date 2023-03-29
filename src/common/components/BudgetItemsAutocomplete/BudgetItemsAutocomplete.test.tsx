/* eslint-disable max-lines */
import React from 'react'

import { theme } from '@common/providers/ThemeProvider/theme'

import {
  capitalAssetsBudgetItem,
  payrollBudgetItem,
  successGetPrepaymentBudgetItems,
} from '@testEnv/mocks/api/prepayment'
import { setupServer } from '@testEnv/server'
import { mockGetPrepaymentBudgetItemsResponse } from '@testEnv/server/handlers/prepayment'
import { act, fireEvent, render, screen, waitFor } from '@testEnv/utils'

import { BudgetItemsAutocomplete } from './BudgetItemsAutocomplete'
import * as T from './BudgetItemsAutocomplete.types'

const mockScrollToSelectedBudgetItem = jest.fn()
const mockLabel = 'Статья'
const mockPlaceholder = 'Например, Продукты'
const mockError = 'Не указана статья'

const mockOnChange = jest.fn()
const defaultProps: T.Props = {
  value: null,
  onChange: mockOnChange,
}

jest.mock('./utils/actions', () => ({
  ...jest.requireActual('./utils/actions'),
  scrollToSelectedBudgetItem: () => mockScrollToSelectedBudgetItem(),
}))

const createServer = () =>
  setupServer(
    mockGetPrepaymentBudgetItemsResponse(successGetPrepaymentBudgetItems),
  )

describe('<BudgetItemsAutocomplete />', () => {
  const getMarks = (root: HTMLElement) => root.querySelectorAll('mark')

  const server = createServer()

  const renderBudgetItemsAutocomplete = (props: Partial<T.Props>) =>
    render(<BudgetItemsAutocomplete {...defaultProps} {...props} />)

  beforeAll(() => server.listen())
  afterAll(() => server.close())

  afterEach(() => {
    server.resetHandlers()
    server.events.removeAllListeners('request:end')
    jest.resetAllMocks()
  })

  describe('when render component', () => {
    it('should render default props', () => {
      renderBudgetItemsAutocomplete({})

      const autocomplete = screen.getByRole('combobox')

      expect(autocomplete).toBeInTheDocument()
      expect(screen.queryByText(mockLabel)).not.toBeInTheDocument()
      expect(screen.queryByText(mockError)).not.toBeInTheDocument()
      expect(screen.queryByText(mockPlaceholder)).not.toBeInTheDocument()
    })

    it('should render label if is passed', () => {
      renderBudgetItemsAutocomplete({ label: mockLabel })

      expect(screen.getByText(mockLabel)).toBeInTheDocument()
    })

    it('should render placeholder if is passed', () => {
      renderBudgetItemsAutocomplete({ placeholder: mockPlaceholder })

      const autocomplete = screen.getByRole('combobox')

      expect(autocomplete).toHaveAttribute('placeholder', mockPlaceholder)
    })

    it('should render error text if is passed', () => {
      renderBudgetItemsAutocomplete({ error: mockError })

      expect(screen.getByText(mockError)).toBeInTheDocument()
    })
  })

  describe('when open budget items list', () => {
    it('should render root options', async () => {
      renderBudgetItemsAutocomplete({})

      const autocomplete = screen.getByRole('combobox')

      fireEvent.mouseDown(autocomplete)

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })

      const rootOptions = screen.getAllByRole('listitem')

      expect(rootOptions.length).toBe(2)
      expect(rootOptions[0]).toHaveTextContent('КОСВЕННЫЕ ЗАТРАТЫ')
      expect(rootOptions[1]).toHaveTextContent('Основные средства')
    })

    it('should render options', async () => {
      renderBudgetItemsAutocomplete({})

      const autocomplete = screen.getByRole('combobox')

      fireEvent.mouseDown(autocomplete)

      await waitFor(() => {
        expect(screen.getAllByRole('option').length).toBe(3)
      })

      const options = screen.getAllByRole('option')

      expect(options[0]).toHaveTextContent('Фонд оплаты труда')
      expect(options[1]).toHaveTextContent(
        'Приход ОС по договору купли-продажи',
      )
      expect(options[2]).toHaveTextContent('Приход ОС по договору лизинга')
    })

    it('should render children options if click parent nested option', async () => {
      renderBudgetItemsAutocomplete({})

      const autocomplete = screen.getByRole('combobox')

      fireEvent.mouseDown(autocomplete)

      await waitFor(() => {
        expect(screen.getAllByRole('option').length).toBe(3)
      })

      const parentOption = screen.getAllByRole('option')[0]

      fireEvent.click(parentOption)

      let options = screen.getAllByRole('option')
      let nestedOptions = screen.getAllByRole('menuitem')

      expect(options[0]).toHaveTextContent('Фонд оплаты труда')
      expect(nestedOptions[0]).toHaveTextContent('Вознаграждение команды')
      expect(options[1]).toHaveTextContent(
        'Приход ОС по договору купли-продажи',
      )
      expect(options[2]).toHaveTextContent('Приход ОС по договору лизинга')

      fireEvent.click(nestedOptions[0])

      options = screen.getAllByRole('option')
      nestedOptions = screen.getAllByRole('menuitem')

      expect(options[0]).toHaveTextContent('Фонд оплаты труда')
      expect(nestedOptions[0]).toHaveTextContent('Вознаграждение команды')
      expect(nestedOptions[1]).toHaveTextContent('Управляющий')
      expect(nestedOptions[2]).toHaveTextContent('Бариста')
      expect(options[1]).toHaveTextContent(
        'Приход ОС по договору купли-продажи',
      )
      expect(options[2]).toHaveTextContent('Приход ОС по договору лизинга')
    })

    it('should call scrollToSelectedBudgetItem func if budget item is selected', async () => {
      const { rerender } = renderBudgetItemsAutocomplete({})

      const autocomplete = screen.getByRole('combobox')

      fireEvent.mouseDown(autocomplete)

      await waitFor(() => {
        expect(screen.getAllByRole('option').length).toBe(3)
      })

      const option = screen.getAllByRole('option')[2]

      act(() => option.click())

      expect(mockOnChange).toBeCalledWith(capitalAssetsBudgetItem)

      expect(screen.queryAllByRole('option').length).toBe(0)

      rerender(
        <BudgetItemsAutocomplete
          {...defaultProps}
          value={capitalAssetsBudgetItem}
        />,
      )

      expect(autocomplete).toHaveValue('Приход ОС по договору лизинга')

      fireEvent.mouseDown(autocomplete)

      await waitFor(() =>
        expect(mockScrollToSelectedBudgetItem).toHaveBeenCalledTimes(1),
      )
    })

    it('should NOT call scrollToSelectedBudgetItem func if budget item is not selected', async () => {
      renderBudgetItemsAutocomplete({})

      const autocomplete = screen.getByRole('combobox')

      expect(autocomplete).toHaveValue('')

      fireEvent.mouseDown(autocomplete)

      await waitFor(() =>
        expect(mockScrollToSelectedBudgetItem).not.toHaveBeenCalled(),
      )
    })

    it('should selected parent option if selected children and close parent', async () => {
      const { user, rerender } = renderBudgetItemsAutocomplete({})

      const autocomplete = screen.getByRole('combobox')

      await user.type(autocomplete, 'уп')

      expect(autocomplete).toHaveValue('уп')

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })

      rerender(<BudgetItemsAutocomplete {...defaultProps} />)

      fireEvent.click(screen.getAllByRole('menuitem')[1])

      rerender(
        <BudgetItemsAutocomplete {...defaultProps} value={payrollBudgetItem} />,
      )

      expect(autocomplete).toHaveValue('Управляющий')

      fireEvent.mouseDown(autocomplete)

      const nestedOption = screen.getAllByRole('menuitem')[0]

      await user.click(nestedOption)

      expect(nestedOption).toHaveStyle(`background-color: ${theme.colors.grey}`)
    })
  })

  describe('when selected option', () => {
    it('should render name option in input if click select option', async () => {
      const { rerender } = renderBudgetItemsAutocomplete({})

      const autocomplete = screen.getByRole('combobox')

      fireEvent.mouseDown(autocomplete)

      await waitFor(() => {
        expect(screen.getAllByRole('option').length).toBe(3)
      })

      const option = screen.getAllByRole('option')[2]

      act(() => option.click())

      expect(mockOnChange).toBeCalledWith(capitalAssetsBudgetItem)
      expect(screen.queryAllByRole('option').length).toBe(0)

      rerender(
        <BudgetItemsAutocomplete
          {...defaultProps}
          value={capitalAssetsBudgetItem}
        />,
      )

      expect(autocomplete).toHaveValue('Приход ОС по договору лизинга')
    })

    it('should render value if is passed', () => {
      const { rerender } = renderBudgetItemsAutocomplete({
        value: capitalAssetsBudgetItem,
      })

      const autocomplete = screen.getByRole('combobox')

      expect(autocomplete).toHaveValue('Приход ОС по договору лизинга')

      rerender(<BudgetItemsAutocomplete {...defaultProps} value={null} />)

      expect(autocomplete).toHaveValue('')
    })
  })

  describe('when input value in autocomplete', () => {
    it('should NOT filter if input value < 2', async () => {
      const { user } = renderBudgetItemsAutocomplete({})

      const autocomplete = screen.getByRole('combobox')

      await user.type(autocomplete, 'б')

      expect(autocomplete).toHaveValue('б')

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })

      const rootOptions = screen.getAllByRole('listitem')
      const options = screen.getAllByRole('option')
      const nestedOptions = screen.queryAllByRole('menuitem')

      expect(rootOptions.length).toBe(2)
      expect(rootOptions[0]).toHaveTextContent('КОСВЕННЫЕ ЗАТРАТЫ')
      expect(rootOptions[1]).toHaveTextContent('Основные средства')

      expect(options.length).toBe(3)
      expect(options[0]).toHaveTextContent('Фонд оплаты труда')
      expect(options[1]).toHaveTextContent(
        'Приход ОС по договору купли-продажи',
      )
      expect(options[2]).toHaveTextContent('Приход ОС по договору лизинга')

      expect(nestedOptions.length).toBe(0)
    })

    it('should filter if input value > 2', async () => {
      const { user, rerender } = renderBudgetItemsAutocomplete({})

      const autocomplete = screen.getByRole('combobox')

      await user.type(autocomplete, 'ба')

      expect(autocomplete).toHaveValue('ба')

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })

      rerender(<BudgetItemsAutocomplete {...defaultProps} />)

      const rootOptions = screen.getAllByRole('listitem')
      const options = screen.getAllByRole('option')
      const nestedOptions = screen.getAllByRole('menuitem')

      expect(rootOptions[0]).toHaveTextContent('КОСВЕННЫЕ ЗАТРАТЫ')

      expect(options.length).toBe(1)
      expect(options[0]).toHaveTextContent('Фонд оплаты труда')

      expect(nestedOptions.length).toBe(2)
      expect(nestedOptions[0]).toHaveTextContent('Вознаграждение команды')
      expect(nestedOptions[1]).toHaveTextContent('Бариста')
    })

    it('should render all options if selected by search input option with open parents', async () => {
      const { user, rerender } = renderBudgetItemsAutocomplete({})

      const autocomplete = screen.getByRole('combobox')

      await user.type(autocomplete, 'уп')

      expect(autocomplete).toHaveValue('уп')

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })

      rerender(<BudgetItemsAutocomplete {...defaultProps} />)

      fireEvent.click(screen.getAllByRole('menuitem')[1])

      rerender(
        <BudgetItemsAutocomplete {...defaultProps} value={payrollBudgetItem} />,
      )

      expect(autocomplete).toHaveValue('Управляющий')

      fireEvent.mouseDown(autocomplete)

      const options = screen.getAllByRole('option')
      const nestedOptions = screen.queryAllByRole('menuitem')

      expect(options.length).toBe(3)
      expect(options[0]).toHaveTextContent('Фонд оплаты труда')
      expect(options[1]).toHaveTextContent(
        'Приход ОС по договору купли-продажи',
      )
      expect(options[2]).toHaveTextContent('Приход ОС по договору лизинга')

      expect(nestedOptions.length).toBe(3)
      expect(nestedOptions[0]).toHaveTextContent('Вознаграждение команды')
      expect(nestedOptions[1]).toHaveTextContent('Управляющий')
      expect(nestedOptions[2]).toHaveTextContent('Бариста')
    })

    it('should filter if selected value started to change', async () => {
      const { user, rerender } = renderBudgetItemsAutocomplete({})

      const autocomplete = screen.getByRole('combobox')

      await user.type(autocomplete, 'уп')

      expect(autocomplete).toHaveValue('уп')

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })

      rerender(<BudgetItemsAutocomplete {...defaultProps} />)

      fireEvent.click(screen.getAllByRole('menuitem')[1])

      rerender(
        <BudgetItemsAutocomplete {...defaultProps} value={payrollBudgetItem} />,
      )

      expect(autocomplete).toHaveValue('Управляющий')

      fireEvent.mouseDown(autocomplete)

      const options = screen.getAllByRole('option')
      const nestedOptions = screen.queryAllByRole('menuitem')

      expect(options.length).toBe(3)
      expect(options[0]).toHaveTextContent('Фонд оплаты труда')
      expect(options[1]).toHaveTextContent(
        'Приход ОС по договору купли-продажи',
      )
      expect(options[2]).toHaveTextContent('Приход ОС по договору лизинга')

      expect(nestedOptions.length).toBe(3)
      expect(nestedOptions[0]).toHaveTextContent('Вознаграждение команды')
      expect(nestedOptions[1]).toHaveTextContent('Управляющий')
      expect(nestedOptions[2]).toHaveTextContent('Бариста')

      expect(autocomplete).toHaveFocus()

      await user.keyboard('{backspace}')

      expect(autocomplete).toHaveValue('Управляющи')
      expect(screen.getByRole('listbox')).toBeInTheDocument()

      const rerenderRootOptions = screen.getAllByRole('listitem')
      const rerenderOptions = screen.getAllByRole('option')
      const rerenderNestedOptions = screen.getAllByRole('menuitem')

      expect(rerenderRootOptions[0]).toHaveTextContent('КОСВЕННЫЕ ЗАТРАТЫ')

      expect(rerenderOptions.length).toBe(1)
      expect(rerenderOptions[0]).toHaveTextContent('Фонд оплаты труда')

      expect(rerenderNestedOptions.length).toBe(2)
      expect(rerenderNestedOptions[0]).toHaveTextContent(
        'Вознаграждение команды',
      )
      expect(rerenderNestedOptions[1]).toHaveTextContent('Управляющий')
    })

    it('should make bold text for searching words', async () => {
      const { user, rerender } = renderBudgetItemsAutocomplete({})

      const autocomplete = screen.getByRole('combobox')

      await user.type(autocomplete, 'ба')

      expect(autocomplete).toHaveValue('ба')

      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })

      rerender(<BudgetItemsAutocomplete {...defaultProps} />)

      const nestedOptions = screen.getAllByRole('menuitem')

      const marks = getMarks(nestedOptions[1])

      expect(marks.length).toEqual(1)
    })
  })
})
