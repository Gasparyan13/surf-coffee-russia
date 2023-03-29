import React from 'react'

import {
  successGetPrepaymentBudgetItems,
  successGetPrepaymentContractorWorkers,
} from '@testEnv/mocks/api/prepayment'
import { setupServer } from '@testEnv/server'
import {
  mockGetPrepaymentBudgetItemsResponse,
  mockGetPrepaymentContractorsResponse,
} from '@testEnv/server/handlers/prepayment'
import { act, fireEvent, render, screen, waitFor } from '@testEnv/utils'

import { FiltersFormRefType } from '../FiltersDrawer/FiltersDrawer.types'
import { FiltersForm } from './FiltersForm'
import { Filters, Props } from './FiltersForm.types'
import { ERROR_MESSAGE_INVALID_RANGE } from './constants/messages/errors'

const mockInitialValues: Filters = {
  operationType: 'PLANNED',
  operationKind: 'WRITE_OFF',
  contractor: {
    id: 538,
    alias: 'Господин Управляющий',
  },
  article: {
    id: 40,
    name: 'Вознаграждение команды',
  },
  amount: {
    min: '10',
    max: '100',
  },
}

const createServer = () =>
  setupServer(
    mockGetPrepaymentBudgetItemsResponse(successGetPrepaymentBudgetItems),
    mockGetPrepaymentContractorsResponse(successGetPrepaymentContractorWorkers),
  )

describe('<FiltersForm />', () => {
  const server = createServer()

  let mockSubmit: null | (() => Promise<void>)
  let mockIsDirty = false

  const setRef = (props: FiltersFormRefType) => {
    if (!props) return
    mockSubmit = props.onSubmit
    mockIsDirty = props.isDirty
  }

  const renderFiltersForm = ({
    initialValues,
    onComplete = async () => {},
  }: Partial<Props>) =>
    render(
      <FiltersForm
        ref={setRef}
        initialValues={initialValues}
        onComplete={onComplete}
      />,
    )

  beforeAll(() => server.listen())

  afterEach(() => {
    mockSubmit = null
    mockIsDirty = false

    server.resetHandlers()
    server.events.removeAllListeners('request:end')
  })

  afterAll(() => {
    server.close()
    jest.resetAllMocks()
  })

  test('render all form fields', async () => {
    renderFiltersForm({})

    expect(screen.getByText('Тип операции')).toBeInTheDocument()
    expect(screen.getByText('Выберите тип')).toBeInTheDocument()

    expect(screen.getByText('Вид операции')).toBeInTheDocument()
    expect(screen.getByText('Выберите вид')).toBeInTheDocument()

    expect(screen.getByText('Контрагент')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Выберите контрагента')).toHaveValue('')

    expect(screen.getByText('Статья')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Выберите статью')).toHaveValue('')

    expect(screen.getByText('Сумма')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('от')).toHaveValue('')
    expect(screen.getByPlaceholderText('до')).toHaveValue('')
  })

  it('should fill form fields if has "initialValues"', async () => {
    renderFiltersForm({ initialValues: mockInitialValues })

    expect(screen.getByText('Тип операции')).toBeInTheDocument()
    expect(screen.getByText('План')).toBeInTheDocument()

    expect(screen.getByText('Вид операции')).toBeInTheDocument()
    expect(screen.getByText('Списание')).toBeInTheDocument()

    expect(screen.getByText('Контрагент')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Господин Управляющий')).toBeInTheDocument()

    expect(screen.getByText('Статья')).toBeInTheDocument()
    expect(
      screen.getByDisplayValue('Вознаграждение команды'),
    ).toBeInTheDocument()

    expect(screen.getByText('Сумма')).toBeInTheDocument()
    expect(screen.getByDisplayValue('10')).toBeInTheDocument()
    expect(screen.getByDisplayValue('100')).toBeInTheDocument()
  })

  describe('when change ref values', () => {
    it('should set "isDirty" to "true"', async () => {
      renderFiltersForm({})

      expect(mockIsDirty).toEqual(false)

      fireEvent.change(screen.getByPlaceholderText('от'), {
        target: { value: '100' },
      })

      await waitFor(async () => {
        expect(mockIsDirty).toEqual(true)
      })
    })

    it('should call "onComplete"', async () => {
      const mockOnComplete = jest.fn()

      renderFiltersForm({
        initialValues: mockInitialValues,
        onComplete: mockOnComplete,
      })

      expect(screen.getByText('Тип операции')).toBeInTheDocument()
      expect(screen.getByText('План')).toBeInTheDocument()

      expect(screen.getByText('Вид операции')).toBeInTheDocument()
      expect(screen.getByText('Списание')).toBeInTheDocument()

      expect(screen.getByText('Контрагент')).toBeInTheDocument()
      expect(
        screen.getByDisplayValue('Господин Управляющий'),
      ).toBeInTheDocument()

      expect(screen.getByText('Статья')).toBeInTheDocument()
      expect(
        screen.getByDisplayValue('Вознаграждение команды'),
      ).toBeInTheDocument()

      expect(screen.getByText('Сумма')).toBeInTheDocument()
      expect(screen.getByDisplayValue('10')).toBeInTheDocument()
      expect(screen.getByDisplayValue('100')).toBeInTheDocument()

      await act(async () => {
        await mockSubmit?.()
      })

      await waitFor(async () => {
        expect(mockOnComplete).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('when display validation errors', () => {
    it('should show error message for "Сумма" if "max" < "min', async () => {
      renderFiltersForm({
        initialValues: {
          ...mockInitialValues,
          amount: {
            min: '100',
            max: '10',
          },
        },
      })

      expect(screen.getByText('Сумма')).toBeInTheDocument()
      expect(screen.getByDisplayValue('100')).toBeInTheDocument()
      expect(screen.getByDisplayValue('10')).toBeInTheDocument()

      await act(async () => {
        await mockSubmit?.()
      })

      await waitFor(async () => {
        expect(
          screen.getByText(ERROR_MESSAGE_INVALID_RANGE),
        ).toBeInTheDocument()
      })
    })
  })
})
