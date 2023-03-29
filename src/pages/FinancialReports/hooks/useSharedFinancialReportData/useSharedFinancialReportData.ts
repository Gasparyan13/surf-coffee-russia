import { useCallback, useLayoutEffect, useMemo, useState } from 'react'

import { VALUE_TO_START_SEARCHING } from '@common/constants'

import { useDelayedRender } from '@hooks'

import {
  CashFlowReportForYearByBudgetItemViewDto,
  CashFlowReportViewDto,
  PlanFactExpensesForYearByBudgetItemGetDto,
  PlanFactExpensesReportGetDto,
} from '@rtkApi/modules/__generated__/analytics'

import { useAppDispatch, useAppSelector } from '@store/rootConfig'

import {
  getBudgetItemsWithCollapseState,
  getBudgetItemsWithSearchState,
  getOriginalBudgetItems,
} from '../../components/FinancialReportLayout/utils/getters'
import { ParsedBudgetItem } from '../../components/TableBody/TableBody.types'
import { DELAYED_RENDER_TIMEOUT } from '../../components/TableBody/constants/common'
import { MONTH_CELL_WIDTH } from '../../components/TableBody/constants/width'
import { ReportType } from '../../components/TableCell/TableCell.types'
import { useFinancialReportCtx } from '../../containers/FinancialReportCtx'
import { getSearch } from '../../redux/financialReport/selectors'
import {
  setFinancialReportReqArgs,
  setSearch,
} from '../../redux/financialReport/slice'
import { useSaveCollapsedRows } from '../useSaveCollapsedRows/useSaveCollapsedRows'
import {
  FIXED_ROW_HEIGHT,
  HEADER_HEIGHT,
  VIRTUALIZED_TABLE_PADDING,
} from './constants/dimensions'

export const LOCAL_STORAGE_COLLAPSED_ROWS = 'finReportTableCollapsedRows'

export type SharedFinancialReportDto = (
  | CashFlowReportForYearByBudgetItemViewDto
  | PlanFactExpensesForYearByBudgetItemGetDto
)[]

export type SharedFinancialReportData = {
  reportType: ReportType
  request: (enterpriseId: number, year: number) => Promise<void>
  lastResponseData?: PlanFactExpensesReportGetDto | CashFlowReportViewDto
}

export const useSharedFinancialReportData = ({
  reportType,
  request,
  lastResponseData,
}: SharedFinancialReportData) => {
  const dispatch = useAppDispatch()
  const { rendered } = useDelayedRender(DELAYED_RENDER_TIMEOUT)

  const { enterpriseId, year, isCurrentYear, currentMonthNumber } =
    useFinancialReportCtx()

  const storedSearchValue = useAppSelector(getSearch(reportType))
  const searchValue =
    storedSearchValue.length >= VALUE_TO_START_SEARCHING
      ? storedSearchValue
      : ''

  const [budgetItems, setBudgetItems] = useState<SharedFinancialReportDto>([])
  const [filteredBudgetItems, setFilteredBudgetItems] = useState<
    ParsedBudgetItem[]
  >([])

  const isLoading = !rendered

  const getColumnWidth = useCallback(
    (i: number) =>
      currentMonthNumber > i - 1 ? MONTH_CELL_WIDTH : MONTH_CELL_WIDTH / 2,
    [currentMonthNumber],
  )

  const { collapsedRowsIds, handleToggleExpandRow } = useSaveCollapsedRows({
    localStorageKey: LOCAL_STORAGE_COLLAPSED_ROWS,
  })

  const handleChangeSearchValue = useCallback(
    (newValue: string) => dispatch(setSearch({ [reportType]: newValue })),
    [dispatch, reportType],
  )

  const scrollToColumn = useMemo(() => {
    if (isCurrentYear) return currentMonthNumber * MONTH_CELL_WIDTH
    return undefined
  }, [currentMonthNumber, isCurrentYear])

  const getFooterHeight = useCallback(
    (height: number) => {
      const bottomOffset =
        height -
        FIXED_ROW_HEIGHT * filteredBudgetItems.length -
        VIRTUALIZED_TABLE_PADDING -
        HEADER_HEIGHT

      return bottomOffset > 0 ? bottomOffset : 0
    },
    [filteredBudgetItems.length],
  )

  useLayoutEffect(() => {
    if (enterpriseId && year) {
      setBudgetItems([])
      request(enterpriseId, year)
      dispatch(setFinancialReportReqArgs({ enterpriseId, year }))
    }

    return () => {
      dispatch(setFinancialReportReqArgs(null))
    }
  }, [year, enterpriseId, request])

  useLayoutEffect(() => {
    if (
      lastResponseData &&
      'data' in lastResponseData &&
      lastResponseData.data?.budgetItems
    ) {
      setBudgetItems(lastResponseData.data.budgetItems)
    }
  }, [lastResponseData])

  useLayoutEffect(() => {
    setFilteredBudgetItems(
      getBudgetItemsWithCollapseState(
        getBudgetItemsWithSearchState(
          getOriginalBudgetItems(budgetItems),
          searchValue,
        ),
        collapsedRowsIds,
      ),
    )
  }, [budgetItems, collapsedRowsIds, searchValue])

  return {
    isLoading,
    scrollToColumn,
    setBudgetItems,
    handleToggleExpandRow,
    filteredBudgetItems,
    budgetItems,
    getColumnWidth,
    searchValue,
    handleChangeSearchValue,
    getFooterHeight,
  }
}
