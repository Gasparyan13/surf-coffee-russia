/* eslint-disable max-lines */
import React from 'react'

import { HEADER_MONTH_YEAR_FORMAT } from '@constants'

import { DateHelper } from '@helpers'

import { theme } from '@providers/ThemeProvider/theme'

import { TEST_ID_CLOSE } from '@uiKit/components/Drawer/components/Header/constants/testIds'

import { FactualExpensesPerOperationViewDto } from '@rtkApi/modules/__generated__/financial'

import { setupStore } from '@store/rootConfig'

import {
  defaultFactualExpensesPerOperationViewDto,
  successGetFinancialExpensesCashFlowOperationsViewSellPurchase,
} from '@testEnv/mocks/api/financial'
import { appConfig } from '@testEnv/mocks/store/app'
import { financialReportConfig } from '@testEnv/mocks/store/financialReport'
import { setupServer, waitForRequest } from '@testEnv/server'
import {
  mockGetFinancialExpensesCashFlowOperationsView,
  mockGetFinancialExpensesPnLOperationsView,
} from '@testEnv/server/handlers/financial'
import { fireEvent, render, screen, waitFor } from '@testEnv/utils'

import { FactOperationsDrawer } from './FactOperationsDrawer'
import * as T from './FactOperationsDrawer.types'
import { dateTypes, operationTypes } from './constants/cellHelperText'
import { TEST_ID_ICON_PURCHASE, TEST_ID_ICON_SELL } from './constants/testIds'

jest.mock('@hooks/useDimensions', () => ({
  useDimensions: () => [() => {}, { height: 1000 }],
}))

const createServer = () =>
  setupServer(
    mockGetFinancialExpensesPnLOperationsView(
      successGetFinancialExpensesCashFlowOperationsViewSellPurchase,
    ),
    mockGetFinancialExpensesCashFlowOperationsView(
      successGetFinancialExpensesCashFlowOperationsViewSellPurchase,
    ),
  )

const testBudgetItemId = 46
const testYearMonth = '2022-10'
const TEST_BUDGET_ITEM_NAME = 'Доставка продукции'

const mockProps: T.Props = {
  budgetItemId: testBudgetItemId,
  budgetItemName: TEST_BUDGET_ITEM_NAME,
  yearMonth: testYearMonth,
  open: true,
  onClose: () => {},
  reportType: 'pnl',
}

describe('<FactOperationsDrawer />', () => {
  const server = createServer()

  let appStore = setupStore({
    app: appConfig({}),
    financialReport: financialReportConfig({}),
  })

  const renderDrawer = (props = mockProps) =>
    render(<FactOperationsDrawer {...props} />, { store: appStore })

  beforeAll(() => server.listen())
  afterAll(() => server.close())

  beforeEach(() => {
    appStore = setupStore({ app: appConfig({}) })
  })
  afterEach(() => {
    jest.resetAllMocks()
    server.events.removeAllListeners('request:end')
    server.resetHandlers()
  })

  describe('when render "FactOperationsDrawer" header', () => {
    test('render correct header content', async () => {
      const { getByText, getByTestId } = renderDrawer()

      expect(getByText(TEST_BUDGET_ITEM_NAME)).toBeInTheDocument()
      expect(
        getByText(
          DateHelper.toLocaleFormat(testYearMonth, HEADER_MONTH_YEAR_FORMAT),
        ),
      ).toBeInTheDocument()
      expect(getByTestId(TEST_ID_CLOSE)).toBeInTheDocument()
    })

    it('should call onClose callback when click "close" button', async () => {
      const mockOnClose = jest.fn()
      const { getByTestId } = renderDrawer({
        ...mockProps,
        onClose: mockOnClose,
      })

      const closeButton = getByTestId(TEST_ID_CLOSE)
      fireEvent.click(closeButton)

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('when open drawer', () => {
    it('should call load "pnl" operations data request', async () => {
      const pendingPnlRequest = waitForRequest(
        server,
        'GET',
        /financial\/expenses\/pnlOperationsView/,
      )

      renderDrawer({
        ...mockProps,
        reportType: 'pnl',
      })

      const pnlRequest = await pendingPnlRequest

      expect(pnlRequest).not.toBeNull()
    })

    it('should call load "cashFlow" operations data request', async () => {
      const pendingCashFlowRequest = waitForRequest(
        server,
        'GET',
        /financial\/expenses\/cashFlowOperationsView/,
      )

      renderDrawer({
        ...mockProps,
        reportType: 'cashFlow',
      })

      const cashFlowRequest = await pendingCashFlowRequest

      expect(cashFlowRequest).not.toBeNull()
    })
  })

  describe('when render "FactOperationsDrawer" content', () => {
    describe('when render first column', () => {
      describe('when render income cell', () => {
        it('should show sell icon', async () => {
          const requestSpy = jest.fn()
          server.events.on('request:end', requestSpy)

          const { getByTestId } = renderDrawer()

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

          await waitFor(async () => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
          })

          await waitFor(() => {
            expect(getByTestId(TEST_ID_ICON_PURCHASE)).toBeInTheDocument()
          })
        })

        it('should show rigth tooltip message', async () => {
          const requestSpy = jest.fn()
          server.events.on('request:end', requestSpy)

          const { getByTestId, getByText } = renderDrawer()

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
          await waitFor(async () => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
          })

          await waitFor(() => {
            expect(getByTestId(TEST_ID_ICON_PURCHASE)).toBeInTheDocument()
          })

          fireEvent.mouseEnter(getByTestId(TEST_ID_ICON_PURCHASE))

          await waitFor(() => {
            expect(getByText(operationTypes.purchase)).toBeInTheDocument()
          })
        })
      })

      describe('when render outcome cell', () => {
        it('should show sell icon', async () => {
          const requestSpy = jest.fn()
          server.events.on('request:end', requestSpy)

          const { getByTestId } = renderDrawer()

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
          await waitFor(async () => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
          })

          await waitFor(() => {
            expect(getByTestId(TEST_ID_ICON_SELL)).toBeInTheDocument()
          })
        })

        it('should show rigth tooltip message', async () => {
          const requestSpy = jest.fn()
          server.events.on('request:end', requestSpy)

          const { getByTestId, getByText } = renderDrawer()

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
          await waitFor(async () => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
          })

          await waitFor(() => {
            expect(getByTestId(TEST_ID_ICON_SELL)).toBeInTheDocument()
          })

          fireEvent.mouseEnter(getByTestId(TEST_ID_ICON_SELL))

          await waitFor(() => {
            expect(getByText(operationTypes.sell)).toBeInTheDocument()
          })
        })
      })
    })

    describe('when render "date" column', () => {
      it('should show rigth tooltip message if operation type === "Транзакция"', async () => {
        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)

        const financialOperations: Required<FactualExpensesPerOperationViewDto>[] =
          [
            {
              ...(defaultFactualExpensesPerOperationViewDto as Required<FactualExpensesPerOperationViewDto>),
              operationId: 1,
              operationType: 'Транзакция',
            },
          ]
        server.use(
          mockGetFinancialExpensesPnLOperationsView(financialOperations),
        )

        const { getByText } = renderDrawer()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
        await waitFor(async () => {
          expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
        })

        await waitFor(() => {
          expect(
            getByText(
              DateHelper.formatServerDateToClient(financialOperations[0].date!),
            ),
          ).toBeInTheDocument()
        })

        fireEvent.mouseEnter(
          getByText(
            DateHelper.formatServerDateToClient(financialOperations[0].date!),
          ),
        )

        await waitFor(() => {
          expect(
            getByText(dateTypes[financialOperations[0].operationType!]),
          ).toBeInTheDocument()
        })
      })

      it('should show rigth tooltip message if operation type === "Кассовый ордер"', async () => {
        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)

        const financialOperations: Required<FactualExpensesPerOperationViewDto>[] =
          [
            {
              ...(defaultFactualExpensesPerOperationViewDto as Required<FactualExpensesPerOperationViewDto>),
              operationId: 1,
              operationType: 'Кассовый ордер',
            },
          ]
        server.use(
          mockGetFinancialExpensesPnLOperationsView(financialOperations),
        )

        const { getByText } = renderDrawer()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
        await waitFor(async () => {
          expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
        })

        await waitFor(() => {
          expect(
            getByText(
              DateHelper.formatServerDateToClient(financialOperations[0].date!),
            ),
          ).toBeInTheDocument()
        })

        fireEvent.mouseEnter(
          getByText(
            DateHelper.formatServerDateToClient(financialOperations[0].date!),
          ),
        )

        await waitFor(() => {
          expect(
            getByText(dateTypes[financialOperations[0].operationType!]),
          ).toBeInTheDocument()
        })
      })

      it('should show rigth tooltip message if operation type === "Чек"', async () => {
        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)

        const financialOperations: Required<FactualExpensesPerOperationViewDto>[] =
          [
            {
              ...(defaultFactualExpensesPerOperationViewDto as Required<FactualExpensesPerOperationViewDto>),
              operationId: 1,
              operationType: 'Чек',
            },
          ]

        server.use(
          mockGetFinancialExpensesPnLOperationsView(financialOperations),
        )

        const { getByText } = renderDrawer()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
        await waitFor(async () => {
          expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
        })

        await waitFor(() => {
          expect(
            getByText(
              DateHelper.formatServerDateToClient(financialOperations[0].date!),
            ),
          ).toBeInTheDocument()
        })

        fireEvent.mouseEnter(
          getByText(
            DateHelper.formatServerDateToClient(financialOperations[0].date!),
          ),
        )

        await waitFor(() => {
          expect(
            getByText(dateTypes[financialOperations[0].operationType!]),
          ).toBeInTheDocument()
        })
      })

      it('should show rigth tooltip message if operation type === "Акт"', async () => {
        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)

        const financialOperations: Required<FactualExpensesPerOperationViewDto>[] =
          [
            {
              ...(defaultFactualExpensesPerOperationViewDto as Required<FactualExpensesPerOperationViewDto>),
              operationId: 1,
              operationType: 'Акт',
            },
          ]

        server.use(
          mockGetFinancialExpensesPnLOperationsView(financialOperations),
        )

        const { getByText } = renderDrawer()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
        await waitFor(async () => {
          expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
        })

        await waitFor(() => {
          expect(
            getByText(
              DateHelper.formatServerDateToClient(financialOperations[0].date!),
            ),
          ).toBeInTheDocument()
        })

        fireEvent.mouseEnter(
          getByText(
            DateHelper.formatServerDateToClient(financialOperations[0].date!),
          ),
        )

        await waitFor(() => {
          expect(
            getByText(dateTypes[financialOperations[0].operationType!]),
          ).toBeInTheDocument()
        })
      })

      it('should show rigth tooltip message if operation type === "Накладная"', async () => {
        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)

        const financialOperations: Required<FactualExpensesPerOperationViewDto>[] =
          [
            {
              ...(defaultFactualExpensesPerOperationViewDto as Required<FactualExpensesPerOperationViewDto>),
              operationId: 1,
              operationType: 'Накладная',
            },
          ]

        server.use(
          mockGetFinancialExpensesPnLOperationsView(financialOperations),
        )

        const { getByText } = renderDrawer()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
        await waitFor(async () => {
          expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
        })

        await waitFor(() => {
          expect(
            getByText(
              DateHelper.formatServerDateToClient(financialOperations[0].date!),
            ),
          ).toBeInTheDocument()
        })

        fireEvent.mouseEnter(
          getByText(
            DateHelper.formatServerDateToClient(financialOperations[0].date!),
          ),
        )

        await waitFor(() => {
          expect(
            getByText(dateTypes[financialOperations[0].operationType!]),
          ).toBeInTheDocument()
        })
      })
    })

    describe('when render "loader" ', () => {
      it('should render "loader" when data is loaded', async () => {
        renderDrawer()

        const loader = screen.getByRole('progressbar')
        expect(loader).toBeInTheDocument()
      })

      it('should not rendered "loader" on successful request', async () => {
        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)

        renderDrawer()

        const loader = screen.getByRole('progressbar')

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

        expect(loader).not.toBeInTheDocument()
      })
    })

    describe('when render "money" column', () => {
      it('should use common font style if "isIncome" is "true"', async () => {
        const financialOperations: Required<FactualExpensesPerOperationViewDto>[] =
          [
            {
              ...(defaultFactualExpensesPerOperationViewDto as Required<FactualExpensesPerOperationViewDto>),
              operationId: 1,
              operationType: 'Накладная',
              isIncome: true,
            },
          ]

        server.use(
          mockGetFinancialExpensesPnLOperationsView(financialOperations),
        )

        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)

        const { getByRole, rerender } = renderDrawer()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
        await waitFor(async () => {
          expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
        })

        rerender(<FactOperationsDrawer {...mockProps} />)

        const table = getByRole('table')
        const cells = table.querySelectorAll('tbody > tr > td')

        const moneyCell = cells[cells.length - 1]

        expect(table).toBeInTheDocument()
        await waitFor(() => {
          expect(moneyCell).toHaveStyleRule('color', theme.colors.black)
        })
      })

      it('should use critical font style if "isIncome" is "false"', async () => {
        const financialOperations: Required<FactualExpensesPerOperationViewDto>[] =
          [
            {
              ...(defaultFactualExpensesPerOperationViewDto as Required<FactualExpensesPerOperationViewDto>),
              operationId: 1,
              operationType: 'Накладная',
              isIncome: false,
              money: -1000,
            },
          ]

        server.use(
          mockGetFinancialExpensesPnLOperationsView(financialOperations),
        )

        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)

        const { getByRole, rerender } = renderDrawer()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
        await waitFor(async () => {
          expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
        })

        rerender(<FactOperationsDrawer {...mockProps} />)

        const table = getByRole('table')
        const cells = table.querySelectorAll('tbody > tr > td')

        const moneyCell = cells[cells.length - 1]

        expect(table).toBeInTheDocument()

        await waitFor(() => {
          expect(moneyCell).toHaveStyleRule('color', theme.colors.critical)
        })
      })
    })
  })
})
