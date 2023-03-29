/* eslint-disable max-lines */
import { act } from '@testing-library/react-hooks'

import { makeNumberedArray } from '@src/common/helpers'

import { VALUE_TO_START_SEARCHING } from '@common/constants'
import { getCurrentMonth, getCurrentYear } from '@common/utils'

import { setupStore } from '@store/rootConfig'

import {
  getAnalyticsCashFlowReportResponse,
  reportBudgetItem,
} from '@testEnv/mocks/api/analytics'
import { mockConfigFinReportCtxValue } from '@testEnv/mocks/providers/financialReportProvider'
import { appConfig, enterpriseId } from '@testEnv/mocks/store/app'
import { renderHook, waitFor } from '@testEnv/utils'

import { MONTH_CELL_WIDTH } from '../../components/TableBody/constants/width'
import {
  SharedFinancialReportData,
  useSharedFinancialReportData,
} from './useSharedFinancialReportData'

const DEFAULT_FILTERED_BUDGET_ITEMS = [
  {
    budgetItemId: 1,
    budgetItemName: 'Выручка',
    hasChildren: true,
    level: 1,
    months: {
      ...reportBudgetItem.months,
    },
    total: {
      ...reportBudgetItem.total,
    },
  },
  {
    budgetItemId: 2,
    budgetItemName: 'Напитки',
    hasChildren: true,
    level: 2,
    parent: 1,
    months: {
      ...reportBudgetItem.months,
    },
    total: {
      ...reportBudgetItem.total,
    },
  },
  {
    budgetItemId: 3,
    budgetItemName: 'Сок',
    hasChildren: false,
    level: 3,
    parent: 2,
    months: {
      ...reportBudgetItem.months,
    },
    total: {
      ...reportBudgetItem.total,
    },
  },
  {
    budgetItemId: 4,
    budgetItemName: 'Кофейные напитки',
    hasChildren: true,
    level: 1,
    months: {
      ...reportBudgetItem.months,
    },
    total: {
      ...reportBudgetItem.total,
    },
  },
  {
    budgetItemId: 5,
    budgetItemName: 'Кофе',
    hasChildren: false,
    level: 2,
    parent: 4,
    months: {
      ...reportBudgetItem.months,
    },
    total: {
      ...reportBudgetItem.total,
    },
  },
]

jest.mock('../../containers/FinancialReportCtx', () => ({
  useFinancialReportCtx: () => mockConfigFinReportCtxValue,
}))

describe('useSharedFinancialReportData()', () => {
  let appStore = setupStore({
    app: appConfig({}),
  })

  const renderUseSharedFinancialReportData = ({
    reportType = 'pnl',
    request = () => Promise.resolve(),
    lastResponseData = { data: getAnalyticsCashFlowReportResponse.data },
  }: Partial<SharedFinancialReportData>) =>
    renderHook(
      (renderProps: Partial<SharedFinancialReportData>) =>
        useSharedFinancialReportData({
          reportType,
          request,
          lastResponseData,
          ...renderProps,
        }),
      { store: appStore },
    )

  beforeEach(() => {
    appStore = setupStore({ app: appConfig({}) })
  })

  describe('when render hook', () => {
    test('return default params', async () => {
      const { result } = renderUseSharedFinancialReportData({})

      expect(result.current.isLoading).toBe(true)
      expect(result.current.scrollToColumn).toEqual(
        getCurrentMonth() * MONTH_CELL_WIDTH,
      )
      expect(typeof result.current.setBudgetItems).toBe('function')
      expect(typeof result.current.handleToggleExpandRow).toBe('function')
      expect(result.current.filteredBudgetItems).toEqual(
        DEFAULT_FILTERED_BUDGET_ITEMS,
      )
      expect(result.current.budgetItems).toEqual(
        getAnalyticsCashFlowReportResponse.data!.budgetItems,
      )
      expect(typeof result.current.getColumnWidth).toBe('function')
      expect(result.current.searchValue).toEqual('')
      expect(typeof result.current.handleChangeSearchValue).toBe('function')
      expect(typeof result.current.getFooterHeight).toBe('function')
    })

    it('should call request object argument', async () => {
      const mockRequest = jest.fn()

      const { result } = renderUseSharedFinancialReportData({
        request: mockRequest,
      })

      expect(result.current.isLoading).toEqual(true)
      expect(mockRequest).toHaveBeenCalledTimes(1)

      await waitFor(() => expect(result.current.isLoading).toEqual(false))
    })

    it('should set budgetItems from response', async () => {
      const { result } = renderUseSharedFinancialReportData({})

      await waitFor(() =>
        expect(result.current.budgetItems).toEqual(
          getAnalyticsCashFlowReportResponse.data!.budgetItems,
        ),
      )

      await waitFor(() =>
        expect(result.current.filteredBudgetItems).toEqual(
          DEFAULT_FILTERED_BUDGET_ITEMS,
        ),
      )
    })

    it('should set enterpriseId and year in Redux financialReport.lastReportReqArgs', async () => {
      renderUseSharedFinancialReportData({})

      expect(appStore.getState().financialReport.lastReportReqArgs).toEqual({
        enterpriseId,
        year: getCurrentYear(),
      })
    })
  })

  describe('when call "handleToggleExpandRow"', () => {
    it('should change filteredBudgetItems depends on toggledExpanded row', async () => {
      const { result } = renderUseSharedFinancialReportData({})

      await act(async () => {
        result.current.handleToggleExpandRow(1)
      })

      const [first, , , forth, fifth] = DEFAULT_FILTERED_BUDGET_ITEMS
      await waitFor(() =>
        expect(result.current.filteredBudgetItems).toEqual([
          first,
          forth,
          fifth,
        ]),
      )

      await act(async () => {
        result.current.handleToggleExpandRow(1)
      })

      await waitFor(() =>
        expect(result.current.filteredBudgetItems).toEqual(
          DEFAULT_FILTERED_BUDGET_ITEMS,
        ),
      )
    })

    it('should change filteredBudgetItems depends on toggledExpanded row if multiple rows been selected', async () => {
      const { result } = renderUseSharedFinancialReportData({})

      await act(async () => {
        result.current.handleToggleExpandRow(1)
      })
      await act(async () => {
        result.current.handleToggleExpandRow(4)
      })

      const [first, , , forth] = DEFAULT_FILTERED_BUDGET_ITEMS

      await waitFor(() =>
        expect(result.current.filteredBudgetItems).toEqual([first, forth]),
      )

      await act(async () => {
        result.current.handleToggleExpandRow(4)
      })
      await act(async () => {
        result.current.handleToggleExpandRow(1)
      })

      await waitFor(() =>
        expect(result.current.filteredBudgetItems).toEqual(
          DEFAULT_FILTERED_BUDGET_ITEMS,
        ),
      )
    })

    it('should NOT change filteredBudgetItems depends on toggledExpanded row', async () => {
      const { result } = renderUseSharedFinancialReportData({})

      await act(async () => {
        result.current.handleToggleExpandRow(1)
      })

      await waitFor(() =>
        expect(result.current.budgetItems).toEqual(
          getAnalyticsCashFlowReportResponse.data!.budgetItems,
        ),
      )

      await act(async () => {
        result.current.handleToggleExpandRow(1)
      })

      await waitFor(() =>
        expect(result.current.budgetItems).toEqual(
          getAnalyticsCashFlowReportResponse.data!.budgetItems,
        ),
      )
    })

    it('should NOT change filteredBudgetItems depends on toggledExpanded row if multiple rows been selected twice', async () => {
      const { result } = renderUseSharedFinancialReportData({})

      await act(async () => {
        result.current.handleToggleExpandRow(1)
      })
      await act(async () => {
        result.current.handleToggleExpandRow(4)
      })

      await waitFor(() =>
        expect(result.current.budgetItems).toEqual(
          getAnalyticsCashFlowReportResponse.data!.budgetItems,
        ),
      )

      await act(async () => {
        result.current.handleToggleExpandRow(4)
      })
      await act(async () => {
        result.current.handleToggleExpandRow(1)
      })

      await waitFor(() =>
        expect(result.current.budgetItems).toEqual(
          getAnalyticsCashFlowReportResponse.data!.budgetItems,
        ),
      )
    })
  })

  describe('when call "getColumnWidth"', () => {
    it('should return getColumnWidth, which return half of MONTH_CELL_WIDTH if column before "currentMonth"', async () => {
      const { result } = renderUseSharedFinancialReportData({})

      // iterating over month indexes
      makeNumberedArray(12, 1).forEach((monthNumber) => {
        if (getCurrentMonth() >= monthNumber)
          return expect(result.current.getColumnWidth(monthNumber)).toEqual(
            MONTH_CELL_WIDTH,
          )
        return expect(result.current.getColumnWidth(monthNumber)).toEqual(
          MONTH_CELL_WIDTH / 2,
        )
      })
    })
  })

  it('should change getFooterHeight return result if "searchValue" is filled', async () => {
    const { result } = renderUseSharedFinancialReportData({})

    await act(async () => {
      result.current.handleChangeSearchValue('Со')
    })

    await waitFor(() => expect(result.current.getFooterHeight(42)).toEqual(0))
    await waitFor(() =>
      expect(result.current.getFooterHeight(1000)).toEqual(757),
    )
    await waitFor(() =>
      expect(result.current.getFooterHeight(500)).toEqual(257),
    )
  })

  it('should change getFooterHeight return result if "searchValue" is filled and has no match', async () => {
    const { result } = renderUseSharedFinancialReportData({})

    await act(async () => {
      result.current.handleChangeSearchValue('Мозг')
    })

    await waitFor(() => expect(result.current.getFooterHeight(42)).toEqual(0))
    await waitFor(() =>
      expect(result.current.getFooterHeight(1000)).toEqual(883),
    )
    await waitFor(() =>
      expect(result.current.getFooterHeight(500)).toEqual(383),
    )
  })

  describe('when call "getFooterHeight"', () => {
    it('should return getFooterHeight with default behavior', async () => {
      const { result } = renderUseSharedFinancialReportData({})

      await waitFor(() => expect(result.current.getFooterHeight(42)).toEqual(0))

      await waitFor(() =>
        expect(result.current.getFooterHeight(1000)).toEqual(673),
      )
      await waitFor(() =>
        expect(result.current.getFooterHeight(500)).toEqual(173),
      )
    })
    describe('when call "handleChangeSearchValue"', () => {
      describe('when change "searchValue"', () => {
        it(`should return an empty string if "searchValue" is less than ${VALUE_TO_START_SEARCHING}`, async () => {
          const { result } = renderUseSharedFinancialReportData({
            reportType: 'pnl',
          })

          expect(result.current.searchValue).toEqual('')

          await act(async () => {
            result.current.handleChangeSearchValue('3')
          })

          expect(result.current.searchValue).toEqual('')
        })

        it(`should return "searchValue" if "searchValue" is greater or equal than ${VALUE_TO_START_SEARCHING}`, async () => {
          const { result } = renderUseSharedFinancialReportData({
            reportType: 'pnl',
          })

          expect(result.current.searchValue).toEqual('')

          await act(async () => {
            result.current.handleChangeSearchValue('13')
          })

          expect(result.current.searchValue).toEqual('13')
        })

        it('should change redux state if report type "pnl"', async () => {
          const { result } = renderUseSharedFinancialReportData({
            reportType: 'pnl',
          })

          expect(appStore.getState().financialReport.search.pnl).toEqual('')

          await act(async () => {
            result.current.handleChangeSearchValue('123')
          })

          expect(appStore.getState().financialReport.search.pnl).toEqual('123')
        })

        it('should change redux state if report type "cashFlow"', async () => {
          const { result } = renderUseSharedFinancialReportData({
            reportType: 'cashFlow',
          })

          expect(appStore.getState().financialReport.search.cashFlow).toEqual(
            '',
          )

          await act(async () => {
            result.current.handleChangeSearchValue('123')
          })

          expect(appStore.getState().financialReport.search.cashFlow).toEqual(
            '123',
          )
        })
      })

      it('should return original list in "filteredBudgetItems" if "searchValue" is empty', async () => {
        const { result } = renderUseSharedFinancialReportData({})

        await waitFor(() =>
          expect(result.current.filteredBudgetItems).toEqual(
            DEFAULT_FILTERED_BUDGET_ITEMS,
          ),
        )
      })

      it('should return original budgetItems if "searchValue" is is empty', async () => {
        const { result } = renderUseSharedFinancialReportData({})

        await waitFor(() =>
          expect(result.current.budgetItems).toEqual(
            getAnalyticsCashFlowReportResponse.data!.budgetItems,
          ),
        )
      })

      it('should return filtered list in "filteredBudgetItems" if "searchValue" is filled', async () => {
        const { result } = renderUseSharedFinancialReportData({})

        await act(async () => {
          result.current.handleChangeSearchValue('Со')
        })

        await waitFor(() =>
          expect(result.current.filteredBudgetItems).toEqual(
            DEFAULT_FILTERED_BUDGET_ITEMS.slice(0, 3),
          ),
        )
      })

      it('should return original budgetItems if "searchValue" is filled', async () => {
        const { result } = renderUseSharedFinancialReportData({})

        await act(async () => {
          result.current.handleChangeSearchValue('Со')
        })

        await waitFor(() =>
          expect(result.current.budgetItems).toEqual(
            getAnalyticsCashFlowReportResponse.data!.budgetItems,
          ),
        )
      })

      it('should return empty list in "filteredBudgetItems" if "searchValue" is filled and no match', async () => {
        const { result } = renderUseSharedFinancialReportData({})

        await act(async () => {
          result.current.handleChangeSearchValue('Мозг')
        })

        await waitFor(() =>
          expect(result.current.filteredBudgetItems).toEqual([]),
        )
      })

      it('should return original budgetItems if "searchValue" is filled and no match', async () => {
        const { result } = renderUseSharedFinancialReportData({})

        await act(async () => {
          result.current.handleChangeSearchValue('Мозг')
        })

        await waitFor(() =>
          expect(result.current.budgetItems).toEqual(
            getAnalyticsCashFlowReportResponse.data!.budgetItems,
          ),
        )
      })
    })
  })
})
