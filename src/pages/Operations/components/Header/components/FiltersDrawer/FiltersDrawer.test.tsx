import React from 'react'

import { WARNING_DATA_LOSS } from '@common/constants'

import { TEST_ID_CLOSE } from '@uiKit/components/Drawer/components/Header/constants/testIds'

import { getEmptyFiltersArray } from '@pages/Operations/utils/getters'

import {
  successGetPrepaymentBudgetItems,
  successGetPrepaymentContractorWorkers,
} from '@testEnv/mocks/api/prepayment'
import { setupServer } from '@testEnv/server'
import {
  mockGetPrepaymentBudgetItemsResponse,
  mockGetPrepaymentContractorsResponse,
} from '@testEnv/server/handlers/prepayment'
import { fireEvent, render, screen, waitFor } from '@testEnv/utils'

import { OperationsReportUrlSearchParams } from '../../../OperationsReport/constants/urlSearchParams'
import { FiltersDrawer } from './FiltersDrawer'
import { Props } from './FiltersDrawer.types'

let MOCK_URL_PARAMS: Record<string, string> = {}

const mockGetQuery = jest
  .fn()
  .mockImplementation(
    (key: keyof typeof MOCK_URL_PARAMS) => MOCK_URL_PARAMS[key],
  )
const mockSetQuery = jest
  .fn()
  .mockImplementation((param: { key: string; value: string }) => {
    MOCK_URL_PARAMS = { ...MOCK_URL_PARAMS, [param.key]: param.value }
  })

jest.mock('@hooks', () => ({
  useLocationQuery: () => ({
    get: mockGetQuery,
    set: mockSetQuery,
  }),
}))

const createServer = () =>
  setupServer(
    mockGetPrepaymentBudgetItemsResponse(successGetPrepaymentBudgetItems),
    mockGetPrepaymentContractorsResponse(successGetPrepaymentContractorWorkers),
  )

describe('<FiltersDrawer />', () => {
  const server = createServer()

  const renderFiltersDrawer = ({
    open = true,
    onClose = () => {},
  }: Partial<Props>) => render(<FiltersDrawer open={open} onClose={onClose} />)

  beforeAll(() => server.listen())

  afterEach(() => {
    MOCK_URL_PARAMS = {}

    server.resetHandlers()
    server.events.removeAllListeners('request:end')
  })

  afterAll(() => {
    server.close()
    jest.resetAllMocks()
  })

  test('render form if open', async () => {
    renderFiltersDrawer({ open: true })

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

  it('should fill form fields if has applied filters in the URL', async () => {
    MOCK_URL_PARAMS = {
      [OperationsReportUrlSearchParams.articleId]: '40',
      [OperationsReportUrlSearchParams.articleName]: 'Вознаграждение команды',
      [OperationsReportUrlSearchParams.contractorId]: '538',
      [OperationsReportUrlSearchParams.contractorName]: 'Господин Управляющий',
      [OperationsReportUrlSearchParams.maxAmount]: '100',
      [OperationsReportUrlSearchParams.minAmount]: '10',
      [OperationsReportUrlSearchParams.operationKind]: 'WRITE_OFF',
      [OperationsReportUrlSearchParams.operationType]: 'PLANNED',
    }

    renderFiltersDrawer({ open: true })

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

  it('should NOT fill form fields if has NO applied filters in the URL', async () => {
    MOCK_URL_PARAMS = {}

    renderFiltersDrawer({ open: true })

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

  it('should clear URL params if click to "Сбросить" button', async () => {
    MOCK_URL_PARAMS = {
      [OperationsReportUrlSearchParams.articleId]: '40',
      [OperationsReportUrlSearchParams.articleName]: 'Вознаграждение команды',
      [OperationsReportUrlSearchParams.contractorId]: '538',
      [OperationsReportUrlSearchParams.contractorName]: 'Господин Управляющий',
      [OperationsReportUrlSearchParams.maxAmount]: '100',
      [OperationsReportUrlSearchParams.minAmount]: '10',
      [OperationsReportUrlSearchParams.operationKind]: 'WRITE_OFF',
      [OperationsReportUrlSearchParams.operationType]: 'PLANNED',
    }

    renderFiltersDrawer({ open: true })

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

    fireEvent.click(screen.getByText('Сбросить'))

    expect(mockSetQuery).toHaveBeenCalledWith(getEmptyFiltersArray())
  })

  it('should set URL params if click to "Применить" button', async () => {
    MOCK_URL_PARAMS = {
      [OperationsReportUrlSearchParams.articleId]: '40',
      [OperationsReportUrlSearchParams.articleName]: 'Вознаграждение команды',
      [OperationsReportUrlSearchParams.contractorId]: '538',
      [OperationsReportUrlSearchParams.contractorName]: 'Господин Управляющий',
      [OperationsReportUrlSearchParams.maxAmount]: '100',
      [OperationsReportUrlSearchParams.minAmount]: '10',
      [OperationsReportUrlSearchParams.operationKind]: 'WRITE_OFF',
      [OperationsReportUrlSearchParams.operationType]: 'PLANNED',
    }

    renderFiltersDrawer({ open: true })

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

    fireEvent.click(screen.getByText('Применить'))

    await waitFor(async () => {
      expect(mockSetQuery).toHaveBeenCalledWith([
        {
          key: OperationsReportUrlSearchParams.operationType,
          value: MOCK_URL_PARAMS[OperationsReportUrlSearchParams.operationType],
        },
        {
          key: OperationsReportUrlSearchParams.operationKind,
          value: MOCK_URL_PARAMS[OperationsReportUrlSearchParams.operationKind],
        },
        {
          key: OperationsReportUrlSearchParams.contractorId,
          value: +MOCK_URL_PARAMS[OperationsReportUrlSearchParams.contractorId],
        },
        {
          key: OperationsReportUrlSearchParams.contractorName,
          value:
            MOCK_URL_PARAMS[OperationsReportUrlSearchParams.contractorName],
        },
        {
          key: OperationsReportUrlSearchParams.articleId,
          value: +MOCK_URL_PARAMS[OperationsReportUrlSearchParams.articleId],
        },
        {
          key: OperationsReportUrlSearchParams.articleName,
          value: MOCK_URL_PARAMS[OperationsReportUrlSearchParams.articleName],
        },
        {
          key: OperationsReportUrlSearchParams.minAmount,
          value: MOCK_URL_PARAMS[OperationsReportUrlSearchParams.minAmount],
        },
        {
          key: OperationsReportUrlSearchParams.maxAmount,
          value: MOCK_URL_PARAMS[OperationsReportUrlSearchParams.maxAmount],
        },
      ])
    })
  })

  describe('when make changes in form', () => {
    it('should open confirmation dialog if form isDirty', async () => {
      renderFiltersDrawer({ open: true })

      fireEvent.change(screen.getByPlaceholderText('от'), {
        target: { value: '100' },
      })

      fireEvent.click(screen.getByTestId(TEST_ID_CLOSE))

      await waitFor(async () => {
        expect(screen.getByText(WARNING_DATA_LOSS)).toBeInTheDocument()
      })
    })
  })
})
