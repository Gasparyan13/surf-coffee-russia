/* eslint-disable max-lines */
import React from 'react'

import { MONTHS_RU } from '@common/constants'
import { getCurrentYear } from '@common/utils'

import { setupStore } from '@store/rootConfig'

import {
  getAnalyticsPlanFactExpensesReportResponse,
  reportBudgetItem,
} from '@testEnv/mocks/api/analytics'
import { mockUseDelayedRender } from '@testEnv/mocks/hooks/useDelayedRender'
import { mockUseWindowSize } from '@testEnv/mocks/hooks/useWindowSize'
import {
  configFinReportCtxValue,
  ConfigFinReportCtxValueParams,
} from '@testEnv/mocks/providers/financialReportProvider'
import { appConfig, enterpriseId } from '@testEnv/mocks/store/app'
import { financialReportConfig } from '@testEnv/mocks/store/financialReport'
import { setupServer } from '@testEnv/server'
import { mockGetAnalyticsPlanFactExpensesReport } from '@testEnv/server/handlers/analytics'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForProgressBarComplete,
} from '@testEnv/utils'

import { FinancialReportProvider } from '../../containers/FinancialReportCtx'
import { TEST_ID_MONTH_FOOTER_CELL } from '../TableBody/components/MonthFooterCell/constants/testIds'
import {
  TEST_ID_MONTH_HEADER,
  TEST_ID_MONTH_HEADER_FACT,
  TEST_ID_MONTH_HEADER_PLAN,
} from '../TableBody/components/MonthHeaderCell/constants/testIds'
import { PLACEHOLDER_NO_SEARCH_RESULTS } from '../TableBody/components/SidebarFooterCell/constants/placeholders'
import { TEST_ID_SIDEBAR_FOOTER_CELL } from '../TableBody/components/SidebarFooterCell/constants/testIds'
import {
  TEST_ID_TOTAL_DATA_FACT,
  TEST_ID_TOTAL_DATA_PLAN,
} from '../TableBody/components/TotalDataCell/constants/testIds'
import { TEST_ID_TOTAL_FOOTER_CELL } from '../TableBody/components/TotalFooterCell/constants/testIds'
import {
  TEST_ID_TOTAL_HEADER_FACT,
  TEST_ID_TOTAL_HEADER_PLAN,
} from '../TableBody/components/TotalHeaderCell/constants/testIds'
import {
  TEST_ID_MONTH_DATA_PLAN,
  TEST_ID_MONTH_DATA_FACT,
} from '../TableCell/components/Cell/constants/testIds'
import { PnLReport } from './PnLReport'

jest.mock('@hooks', () => ({
  useWindowSize: mockUseWindowSize({
    height: 1920,
    width: 3160,
  }),
  useDelayedRender: mockUseDelayedRender(true),
}))

const createServer = () => setupServer(mockGetAnalyticsPlanFactExpensesReport())

describe('<PnLReport />', () => {
  const PLAN_COLUMN_TEXT = 'План'
  const FACT_COLUMN_TEXT = 'Факт'

  const server = createServer()

  let appStore = setupStore({
    app: appConfig({}),
    financialReport: financialReportConfig({}),
  })

  // not real mock
  // just disable "buffer set: 0" messages on tests
  // provided by "getBufferRowCount (node_modules/fixed-data-table-2/internal/selectors/roughHeights.js:185:13)"
  const log = jest.spyOn(console, 'log').mockImplementation(() => {})

  const wrapper = (params: ConfigFinReportCtxValueParams) => (
    <FinancialReportProvider
      value={{ ...configFinReportCtxValue({}), ...params }}>
      <PnLReport />
    </FinancialReportProvider>
  )

  const renderPnLReport = (params: ConfigFinReportCtxValueParams) =>
    render(wrapper(params), { store: appStore })

  beforeAll(() => server.listen())
  afterAll(() => {
    log.mockClear()
    server.close()
  })

  beforeEach(() => {
    appStore = setupStore({ app: appConfig({}) })
  })

  afterEach(() => {
    jest.resetAllMocks()
    server.events.removeAllListeners('request:end')
    server.resetHandlers()
  })

  describe('when render "PnLReport" first time', () => {
    it('should send "getAnalyticsPlanFactExpensesReport" request', async () => {
      renderPnLReport({})

      await waitFor(() => {
        expect(
          appStore.getState().api.queries[
            `getAnalyticsPlanFactExpensesReport({"enterpriseId":${enterpriseId},"year":${getCurrentYear()}})`
          ]?.status,
        ).toEqual('fulfilled')
      })
    })

    it('should save last request args to store', async () => {
      renderPnLReport({})

      expect(appStore.getState().financialReport.lastReportReqArgs).toEqual({
        enterpriseId,
        year: getCurrentYear(),
      })
    })
  })

  describe('when render table', () => {
    describe('when render "sidebar" column', () => {
      it('should render "SearchField"', async () => {
        renderPnLReport({})

        await waitFor(() => {
          expect(screen.getByPlaceholderText('Поиск')).toBeInTheDocument()
        })
      })

      it('should render "budgetItemNames"', async () => {
        const budgetItems =
          getAnalyticsPlanFactExpensesReportResponse.data!.budgetItems!

        renderPnLReport({})

        await waitForProgressBarComplete()

        budgetItems.forEach(({ budgetItemName }) => {
          expect(screen.getByText(budgetItemName!)).toBeInTheDocument()
        })
      })

      describe('when render footer', () => {
        it('should render footer cell', async () => {
          renderPnLReport({})

          await waitForProgressBarComplete()

          expect(
            screen.getByTestId(TEST_ID_SIDEBAR_FOOTER_CELL),
          ).toBeInTheDocument()
        })

        it('should render no search result placeholder', async () => {
          renderPnLReport({})

          await waitForProgressBarComplete()

          fireEvent.change(screen.getByPlaceholderText('Поиск'), {
            target: { value: '1234' },
          })

          await waitFor(() => {
            expect(
              screen.getByText(PLACEHOLDER_NO_SEARCH_RESULTS),
            ).toBeInTheDocument()
          })
        })
      })
    })

    describe('when render "Итого" column', () => {
      it('should render correct title', async () => {
        renderPnLReport({})

        await waitForProgressBarComplete()

        expect(screen.getByText('Итого')).toBeInTheDocument()
      })

      describe('when render "PLAN', () => {
        it('should render subcolumn', async () => {
          renderPnLReport({})

          await waitForProgressBarComplete()

          expect(
            screen.getByTestId(TEST_ID_TOTAL_HEADER_PLAN),
          ).toHaveTextContent(PLAN_COLUMN_TEXT)
        })

        it('should render DOM node for each budgetItem', async () => {
          const budgetItems =
            getAnalyticsPlanFactExpensesReportResponse.data!.budgetItems!

          renderPnLReport({})

          await waitForProgressBarComplete()

          budgetItems.forEach(({ budgetItemId }) => {
            expect(
              screen.getByTestId(`${TEST_ID_TOTAL_DATA_PLAN}-${budgetItemId}`),
            ).toBeInTheDocument()
          })
        })
      })

      describe('when render "FACT', () => {
        it('should render subcolumn', async () => {
          renderPnLReport({})

          await waitForProgressBarComplete()

          expect(
            screen.getByTestId(TEST_ID_TOTAL_HEADER_FACT),
          ).toHaveTextContent(FACT_COLUMN_TEXT)
        })

        it('should render DOM node for each budgetItem', async () => {
          const budgetItems =
            getAnalyticsPlanFactExpensesReportResponse.data!.budgetItems!

          renderPnLReport({})

          await waitForProgressBarComplete()

          budgetItems.forEach(({ budgetItemId }) => {
            expect(
              screen.getByTestId(`${TEST_ID_TOTAL_DATA_FACT}-${budgetItemId}`),
            ).toBeInTheDocument()
          })
        })
      })

      describe('when render footer', () => {
        it('should render footer cell', async () => {
          renderPnLReport({})

          await waitForProgressBarComplete()

          expect(
            screen.getByTestId(TEST_ID_TOTAL_FOOTER_CELL),
          ).toBeInTheDocument()
        })
      })
    })

    describe('when render calendar months', () => {
      it('should render "MONTH" and "YEAR" in header', async () => {
        renderPnLReport({})

        await waitForProgressBarComplete()

        MONTHS_RU.forEach((month, i) => {
          const cell = screen.getByTestId(`${TEST_ID_MONTH_HEADER}-${i}`)

          expect(cell).toContainHTML('2022')
          expect(cell).toContainHTML(month)
        })
      })

      describe('when render data', () => {
        const planFactClickableMonth = 'Nov'
        const planFactUnclickableMonth = 'Oct'
        const planFactEmptyMonth = 'Jul'
        const item = reportBudgetItem

        describe('when render "FACT"', () => {
          it('should render subcolumn title', async () => {
            renderPnLReport({})

            await waitForProgressBarComplete()

            MONTHS_RU.forEach((_, i) => {
              expect(
                screen.getByTestId(`${TEST_ID_MONTH_HEADER_FACT}-${i}`),
              ).toHaveTextContent(FACT_COLUMN_TEXT)
            })
          })

          it('should render data if has value', async () => {
            renderPnLReport({})

            await waitForProgressBarComplete()

            expect(
              screen.getByTestId(
                `${TEST_ID_MONTH_DATA_FACT}-${item.budgetItemId}-${planFactUnclickableMonth}`,
              ),
            ).toHaveTextContent('-42 441')
          })

          it('should NOT render data if empty', async () => {
            renderPnLReport({})

            await waitForProgressBarComplete()

            expect(
              screen.queryByTestId(
                `${TEST_ID_MONTH_DATA_FACT}-${item.budgetItemId}-${planFactEmptyMonth}`,
              ),
            ).not.toBeInTheDocument()
          })

          describe('when click', () => {
            it('should call "handleCellClick" if "isActiveFactCell" is "true"', async () => {
              const mockHandleCellClick = jest.fn()

              renderPnLReport({ handleCellClick: () => mockHandleCellClick })

              await waitForProgressBarComplete()

              const cell = screen.getByTestId(
                `${TEST_ID_MONTH_DATA_FACT}-${item.budgetItemId}-${planFactClickableMonth}`,
              )

              fireEvent.click(cell)

              expect(mockHandleCellClick).toHaveBeenCalledWith({
                budgetItemId: 1,
                budgetItemName: 'Выручка',
                date: '2022-11-01',
                isEditable: true,
                text: '-99',
                yearMonth: '2022-11',
              })
            })

            it('should call "handleCellClick" if "isActiveFactCell" is "false"', async () => {
              const mockHandleCellClick = jest.fn()

              renderPnLReport({ handleCellClick: () => mockHandleCellClick })

              await waitForProgressBarComplete()

              const cell = screen.getByTestId(
                `${TEST_ID_MONTH_DATA_FACT}-${item.budgetItemId}-${planFactUnclickableMonth}`,
              )

              fireEvent.click(cell)

              expect(mockHandleCellClick).toHaveBeenCalledWith({
                budgetItemId: 1,
                budgetItemName: 'Выручка',
                date: '2022-10-01',
                isEditable: false,
                text: '-42441',
                yearMonth: '2022-10',
              })
            })
          })
        })

        describe('when render "PLAN"', () => {
          it('should render subcolumn title', async () => {
            renderPnLReport({})

            await waitForProgressBarComplete()

            MONTHS_RU.forEach((_, i) => {
              expect(
                screen.getByTestId(`${TEST_ID_MONTH_HEADER_PLAN}-${i}`),
              ).toHaveTextContent(PLAN_COLUMN_TEXT)
            })
          })

          it('should render data if has value', async () => {
            renderPnLReport({})

            await waitForProgressBarComplete()

            expect(
              screen.getByTestId(
                `${TEST_ID_MONTH_DATA_PLAN}-${item.budgetItemId}-${planFactUnclickableMonth}`,
              ),
            ).toHaveTextContent('1 200')
          })

          it('should NOT render data if empty', async () => {
            renderPnLReport({})

            await waitForProgressBarComplete()

            expect(
              screen.queryByTestId(
                `${TEST_ID_MONTH_DATA_PLAN}-${item.budgetItemId}-${planFactEmptyMonth}`,
              ),
            ).not.toBeInTheDocument()
          })

          describe('when click', () => {
            it('should call "handleCellClick" if "isActiveFactCell" is "true"', async () => {
              const mockHandleCellClick = jest.fn()

              renderPnLReport({ handleCellClick: () => mockHandleCellClick })

              await waitForProgressBarComplete()

              const cell = screen.getByTestId(
                `${TEST_ID_MONTH_DATA_PLAN}-${item.budgetItemId}-${planFactClickableMonth}`,
              )

              fireEvent.click(cell)

              expect(mockHandleCellClick).toHaveBeenCalledWith({
                budgetItemId: 1,
                budgetItemName: 'Выручка',
                date: '2022-11-01',
                isEditable: true,
                text: '2645',
                yearMonth: '2022-11',
              })
            })

            it('should call "handleCellClick" if "isActiveFactCell" is "false"', async () => {
              const mockHandleCellClick = jest.fn()

              renderPnLReport({ handleCellClick: () => mockHandleCellClick })

              await waitForProgressBarComplete()

              const cell = screen.getByTestId(
                `${TEST_ID_MONTH_DATA_PLAN}-${item.budgetItemId}-${planFactUnclickableMonth}`,
              )

              fireEvent.click(cell)

              expect(mockHandleCellClick).toHaveBeenCalledWith({
                budgetItemId: 1,
                budgetItemName: 'Выручка',
                date: '2022-10-01',
                isEditable: false,
                text: '1200',
                yearMonth: '2022-10',
              })
            })
          })
        })
      })

      describe('when render footer', () => {
        it('should render footer cell', async () => {
          renderPnLReport({})

          await waitForProgressBarComplete()

          MONTHS_RU.forEach((_, i) => {
            expect(
              screen.getByTestId(`${TEST_ID_MONTH_FOOTER_CELL}-${i}`),
            ).toBeInTheDocument()
          })
        })
      })
    })
  })
})
