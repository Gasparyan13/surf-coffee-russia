/* eslint-disable max-lines */
import React from 'react'

import { HEADER_MONTH_YEAR_FORMAT } from '@constants'

import { DateHelper } from '@helpers'

import { TEST_ID_CLOSE } from '@uiKit/components/Drawer/components/Header/constants/testIds'

import { setupStore } from '@store/rootConfig'

import { successGetFinancialPlannedOperationsPlannedAmountsByBudgetItems } from '@testEnv/mocks/api/financial'
import { appConfig } from '@testEnv/mocks/store/app'
import { financialReportConfig } from '@testEnv/mocks/store/financialReport'
import { setupServer, waitForRequest } from '@testEnv/server'
import { mockGetFinancialPlannedOperationsPlannedAmountsByBudgetItems } from '@testEnv/server/handlers/financial'
import { fireEvent, render, screen, waitFor } from '@testEnv/utils'

import { PlanOperationsDrawer } from './PlanOperationsDrawer'
import * as T from './PlanOperationsDrawer.types'
import { headerColumns } from './constants/headerColumns'

jest.mock('@hooks/useDimensions', () => ({
  useDimensions: () => [() => {}, { height: 1000 }],
}))

const createServer = () =>
  setupServer(
    mockGetFinancialPlannedOperationsPlannedAmountsByBudgetItems(
      successGetFinancialPlannedOperationsPlannedAmountsByBudgetItems,
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
  planOrFactType: 'fact',
  reportType: 'pnl',
}

describe('<PlanOperationsDrawer />', () => {
  const server = createServer()

  let appStore = setupStore({
    app: appConfig({}),
    financialReport: financialReportConfig({}),
  })

  const renderDrawer = (props = mockProps) =>
    render(<PlanOperationsDrawer {...props} />, {
      store: appStore,
    })

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

  describe('when render "PlanOperationsDrawer" header', () => {
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
    it('should call load operations data request', async () => {
      const pendingRequest = waitForRequest(
        server,
        'GET',
        /financial\/planned_operations\/plannedAmountsByBudgetItems/,
      )

      renderDrawer()

      const request = await pendingRequest

      expect(request).not.toBeNull()
    })

    test('render total sum', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      const { getByText } = renderDrawer()

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      await waitFor(() => {
        expect(getByText('20')).toBeInTheDocument()
      })
      await waitFor(() => {
        expect(getByText('₽')).toBeInTheDocument()
      })
    })

    describe('when render table', () => {
      test('render corect header', async () => {
        const requestSpy = jest.fn()
        server.events.on('request:end', requestSpy)

        const { getByRole } = renderDrawer()

        await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
        await waitFor(async () => {
          expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
        })

        const table = getByRole('table')
        const headerCells = table.querySelectorAll('thead > tr > th')

        headerCells.forEach((node, index) => {
          expect(node).toContainHTML(headerColumns[index].title)
        })
      })

      describe('when render row content', () => {
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

        describe('when render first column', () => {
          it('sholud show "Списание" if "isWriteOff===true"', async () => {
            const requestSpy = jest.fn()
            server.events.on('request:end', requestSpy)

            const { getByRole, rerender } = renderDrawer()

            await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
            await waitFor(async () => {
              expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
            })

            rerender(<PlanOperationsDrawer {...mockProps} />)

            const table = getByRole('table')
            const rows = table.querySelectorAll('tbody > tr')
            const cells = rows[0].querySelectorAll('td')

            expect(cells[0]).toContainHTML('Списание')
          })

          it('sholud show "Поступление" if "isWriteOff===false"', async () => {
            const requestSpy = jest.fn()
            server.events.on('request:end', requestSpy)

            const { getByRole, rerender } = renderDrawer()

            await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
            await waitFor(async () => {
              expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
            })

            rerender(<PlanOperationsDrawer {...mockProps} />)

            const table = getByRole('table')
            const rows = table.querySelectorAll('tbody > tr')
            const cells = rows[1].querySelectorAll('td')

            expect(cells[0]).toContainHTML('Поступление')
          })
        })
        test('render "Дата оплаты"', async () => {
          const requestSpy = jest.fn()
          server.events.on('request:end', requestSpy)

          const { getByRole, rerender } = renderDrawer()

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
          await waitFor(async () => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
          })

          rerender(<PlanOperationsDrawer {...mockProps} />)

          const table = getByRole('table')
          const rows = table.querySelectorAll('tbody > tr')
          const cells = rows[0].querySelectorAll('td')

          expect(cells[1]).toContainHTML('10-11-2022')
        })

        test('render "Дата начисления"', async () => {
          const requestSpy = jest.fn()
          server.events.on('request:end', requestSpy)

          const { getByRole, rerender } = renderDrawer()

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
          await waitFor(async () => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
          })

          rerender(<PlanOperationsDrawer {...mockProps} />)

          const table = getByRole('table')
          const rows = table.querySelectorAll('tbody > tr')
          const cells = rows[0].querySelectorAll('td')

          expect(cells[2]).toContainHTML('10-11-2022')
        })

        test('render "Контрагент"', async () => {
          const requestSpy = jest.fn()
          server.events.on('request:end', requestSpy)

          const { getByRole, rerender } = renderDrawer()

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
          await waitFor(async () => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
          })

          rerender(<PlanOperationsDrawer {...mockProps} />)

          const table = getByRole('table')
          const rows = table.querySelectorAll('tbody > tr')
          const cells = rows[0].querySelectorAll('td')

          expect(cells[3]).toContainHTML('Name1')
        })

        test('render "Сумма"', async () => {
          const requestSpy = jest.fn()
          server.events.on('request:end', requestSpy)

          const { getByRole, rerender } = renderDrawer()

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
          await waitFor(async () => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
          })

          rerender(<PlanOperationsDrawer {...mockProps} />)

          const table = getByRole('table')
          const rows = table.querySelectorAll('tbody > tr')
          const cells = rows[0].querySelectorAll('td')

          expect(cells[4]).toContainHTML('10')
        })
      })
    })
  })
})
