import React from 'react'
import { act } from 'react-dom/test-utils'

import { YEAR_MONTH_FORMAT } from '@common/constants'
import { getCurrentMonth, getCurrentYear } from '@common/utils'

import { setupStore } from '@store/rootConfig'

import {
  successGetFinancialExpensesCashFlowOperationsViewSellPurchase,
  successGetFinancialPlannedOperationsPlannedAmountsByBudgetItems,
} from '@testEnv/mocks/api/financial'
import { appConfig, enterpriseId } from '@testEnv/mocks/store/app'
import { financialReportConfig } from '@testEnv/mocks/store/financialReport'
import { setupServer } from '@testEnv/server'
import {
  mockGetFinancialExpensesCashFlowOperationsView,
  mockGetFinancialExpensesPnLOperationsView,
  mockGetFinancialPlannedOperationsPlannedAmountsByBudgetItems,
} from '@testEnv/server/handlers/financial'
import { render, screen, waitFor } from '@testEnv/utils'

import { FinancialReportLayout } from './FinancialReportLayout'
import { getFormattedFirstDayOfMonth } from './utils/getters'

const TEST_CONTENT = 'test content'
let MOCK_CTX_VALUE: Record<string, any> = {}

jest.mock('@hooks/useDimensions', () => ({
  useDimensions: () => [() => {}, { height: 1000 }],
}))

jest.mock('../FinReportHeader', () => ({
  FinReportHeader: () => <div>FinReportHeader</div>,
}))

jest.mock('../../containers/FinancialReportCtx', () => ({
  FinancialReportProvider: ({ children, value }: Record<string, any>) => {
    MOCK_CTX_VALUE = value as Record<string, any>
    return <div>{children}</div>
  },
}))

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Outlet: () => <div>{TEST_CONTENT}</div>,
}))

const createServer = () =>
  setupServer(
    mockGetFinancialPlannedOperationsPlannedAmountsByBudgetItems(
      successGetFinancialPlannedOperationsPlannedAmountsByBudgetItems,
    ),
    mockGetFinancialExpensesPnLOperationsView(
      successGetFinancialExpensesCashFlowOperationsViewSellPurchase,
    ),
    mockGetFinancialExpensesCashFlowOperationsView(
      successGetFinancialExpensesCashFlowOperationsViewSellPurchase,
    ),
  )

describe('<FinancialReportLayout />', () => {
  const server = createServer()

  let appStore = setupStore({
    app: appConfig({}),
    financialReport: financialReportConfig({}),
  })

  const renderFinancialReportLayout = () =>
    render(<FinancialReportLayout />, {
      store: appStore,
    })

  beforeEach(() => {
    MOCK_CTX_VALUE = {}
    appStore = setupStore({ app: appConfig({}) })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeAll(() => server.listen())
  afterAll(() => server.close())

  test('render correct title', () => {
    renderFinancialReportLayout()

    expect(screen.getByText('Финансовые отчеты')).toBeInTheDocument()
  })

  test('render children', () => {
    renderFinancialReportLayout()

    expect(screen.getByText(TEST_CONTENT)).toBeInTheDocument()
  })

  test('render FinReportHeader', () => {
    renderFinancialReportLayout()

    expect(screen.getByText('FinReportHeader')).toBeInTheDocument()
  })

  test('initialize context values', () => {
    renderFinancialReportLayout()

    const year = getCurrentYear()
    const currentMonthNumber = getCurrentMonth()
    const commonDateArgs = { year, month: currentMonthNumber }

    const {
      handleCellClick,
      handleChangeYear,
      handleShowMessage,
      ...restValues
    } = MOCK_CTX_VALUE

    expect(typeof handleCellClick === 'function').toBeTruthy()
    expect(typeof handleChangeYear === 'function').toBeTruthy()
    expect(typeof handleShowMessage === 'function').toBeTruthy()
    expect(restValues).toEqual({
      currentMonthNumber,
      enterpriseId,
      expensesDate: getFormattedFirstDayOfMonth(commonDateArgs),
      isCurrentYear: true,
      message: null,
      year,
      yearMonth: getFormattedFirstDayOfMonth({
        ...commonDateArgs,
        format: YEAR_MONTH_FORMAT,
      }),
    })
  })

  it('should change message if "handleShowMessage" was called', async () => {
    renderFinancialReportLayout()

    const { handleShowMessage, message } = MOCK_CTX_VALUE

    expect(message).toEqual(null)

    act(() => {
      handleShowMessage('test')
    })

    await waitFor(async () => {
      expect(MOCK_CTX_VALUE.message).toEqual('test')
    })
  })

  it('should change year if "handleChangeYear" was called', async () => {
    renderFinancialReportLayout()

    const { handleChangeYear, year } = MOCK_CTX_VALUE

    expect(year).toEqual(getCurrentYear())

    act(() => {
      handleChangeYear(2000)
    })

    await waitFor(async () => {
      expect(MOCK_CTX_VALUE.year).toEqual(2000)
    })
  })

  describe('when show "progressbar"', () => {
    it('should show "progressbar" if has NO "enterpriseId"', () => {
      appStore = setupStore({
        app: appConfig({
          roles: {
            admin: [],
            manager: [],
            barista: [],
          },
        }),
      })

      renderFinancialReportLayout()

      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('should NOT show "progressbar" if has "enterpriseId"', () => {
      appStore = setupStore({
        app: appConfig({}),
      })

      renderFinancialReportLayout()

      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
    })
  })

  describe('when open drawers', () => {
    const defaultCellHandlerArgs = {
      budgetItemId: 29,
      budgetItemName: 'Техническое обеспечение',
      date: '2022-10-01',
      isEditable: true,
      text: undefined,
      yearMonth: '2022-10',
    }

    it('should open "FactOperationsDrawer"', async () => {
      renderFinancialReportLayout()

      const { handleCellClick } = MOCK_CTX_VALUE

      act(() => {
        handleCellClick('fact')(defaultCellHandlerArgs)
      })

      await waitFor(async () => {
        expect(
          screen.getByText(defaultCellHandlerArgs.budgetItemName),
        ).toBeInTheDocument()
      })
    })

    it('should open "PlanOperationsDrawer"', async () => {
      renderFinancialReportLayout()

      const { handleCellClick } = MOCK_CTX_VALUE

      act(() => {
        handleCellClick('plan')(defaultCellHandlerArgs)
      })

      await waitFor(async () => {
        expect(
          screen.getByText(defaultCellHandlerArgs.budgetItemName),
        ).toBeInTheDocument()
      })
    })
  })
})
