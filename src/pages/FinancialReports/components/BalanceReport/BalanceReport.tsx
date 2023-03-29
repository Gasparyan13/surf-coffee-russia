import { Column } from 'fixed-data-table-2'
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'

import { DEFAULT_DATE_FORMAT } from '@constants'

import { DateHelper } from '@helpers'

import { useDelayedRender, useLocationQuery } from '@hooks'

import { replaceMessageVariables } from '@utils'

import {
  GetAnalyticsBalanceSheetByEnterpriseIdApiArg,
  useLazyGetAnalyticsBalanceSheetByEnterpriseIdQuery,
} from '@rtkApi/modules/__generated__/analytics'

import { useAppDispatch } from '@store/rootConfig'

import { useFinancialReportCtx } from '../../containers/FinancialReportCtx'
import { useSaveCollapsedRows } from '../../hooks/useSaveCollapsedRows/useSaveCollapsedRows'
import { setFinancialReportReqArgs } from '../../redux/financialReport/slice'
import {
  BALANCE_MATCH_MESSAGE,
  ERROR_BALANCE_MISMATCH,
} from '../FinancialReportLayout/constants/messages'
import { TableBody } from '../TableBody'
import { ParsedBalanceBudgetItem } from '../TableBody/TableBody.types'
import { SidebarDataCell } from '../TableBody/components/SidebarDataCell'
import { SidebarFooterCell } from '../TableBody/components/SidebarFooterCell'
import { SidebarHeaderCell } from '../TableBody/components/SidebarHeaderCell'
import { TotalBalanceDataCell } from '../TableBody/components/TotalBalanceDataCell'
import { TotalBalanceFooterCell } from '../TableBody/components/TotalBalanceFooterCell'
import { TotalBalanceHeaderCell } from '../TableBody/components/TotalBalanceHeaderCell'
import { DELAYED_RENDER_TIMEOUT } from '../TableBody/constants/common'
import { Root, tableFirstColumnCSS } from './BalanceReport.styled'
import * as T from './BalanceReport.types'
import {
  HEADER_HEIGHT,
  HEADER_INFO_DATE_FORMAT,
  LOCAL_STORAGE_COLLAPSED_ROWS,
  TOTALS_WIDTH,
} from './constants'
import {
  getFilteredRows,
  getFormattedBalanceItems,
  getSidebarWidth,
  getTableFooterHeight,
} from './utils/getters'

export const BalanceReport: React.FC = () => {
  const dispatch = useAppDispatch()
  const { enterpriseId, handleShowMessage } = useFinancialReportCtx()

  const { get } = useLocationQuery()
  const { rendered } = useDelayedRender(DELAYED_RENDER_TIMEOUT)

  const year = get('year')
  const month = get('month')

  const [items, setItems] = useState<ParsedBalanceBudgetItem[]>([])
  const [periodData, setPeriodData] = useState<T.PeriodDates>({
    periodStartDate: '',
    periodEndDate: '',
  })
  const [filteredItems, setFilteredItems] = useState<ParsedBalanceBudgetItem[]>(
    [],
  )

  const tableSize = useRef({
    height: 0,
    width: 0,
  })

  const isLoading = !filteredItems.length || !rendered

  const onChangeExpandedRows = useCallback(
    (collapsedRowsIds: number[]) => {
      setFilteredItems(getFilteredRows(items, collapsedRowsIds))
    },
    [items],
  )

  const { handleToggleExpandRow } = useSaveCollapsedRows({
    rows: items,
    onChangeExpandedRows,
    localStorageKey: LOCAL_STORAGE_COLLAPSED_ROWS,
  })

  const onResize = useCallback((height: number, width: number) => {
    tableSize.current.height = height
    tableSize.current.width = width
  }, [])

  const [apiBalanceSheetRequest, { data: lastBalanceSheetData }] =
    useLazyGetAnalyticsBalanceSheetByEnterpriseIdQuery()

  const getFooterHeight = useCallback(
    (height: number) => getTableFooterHeight(height, filteredItems.length),
    [filteredItems.length],
  )

  const fetchBalanceSheet = useCallback(() => {
    const args: GetAnalyticsBalanceSheetByEnterpriseIdApiArg = {
      enterpriseId,
      period: `${year}-${month?.padStart(2, '0')}`,
    } as unknown as GetAnalyticsBalanceSheetByEnterpriseIdApiArg
    apiBalanceSheetRequest(args)
    dispatch(setFinancialReportReqArgs(args))
  }, [apiBalanceSheetRequest, dispatch, enterpriseId, month, year])

  useLayoutEffect(() => {
    if (month && year && enterpriseId) fetchBalanceSheet()
    return () => {
      dispatch(setFinancialReportReqArgs(null))
      setItems([])
    }
  }, [enterpriseId, year, month])

  useLayoutEffect(() => {
    if (
      lastBalanceSheetData &&
      lastBalanceSheetData.periodEndSheet &&
      lastBalanceSheetData.periodStartSheet
    ) {
      const {
        periodEndSheet: {
          sumMismatch: sumMismatchEnd,
          periodDate: periodEndDate,
        },
        periodStartSheet: { periodDate: periodStartDate },
      } = lastBalanceSheetData

      setItems(getFormattedBalanceItems(lastBalanceSheetData))
      setPeriodData({
        periodStartDate: DateHelper.toFormat(
          periodStartDate!,
          DEFAULT_DATE_FORMAT,
        ),
        periodEndDate: DateHelper.toFormat(periodEndDate!, DEFAULT_DATE_FORMAT),
      })
      handleShowMessage({
        type: sumMismatchEnd ? 'warning' : 'info',
        text: replaceMessageVariables(
          sumMismatchEnd ? ERROR_BALANCE_MISMATCH : BALANCE_MATCH_MESSAGE,
          {
            date: DateHelper.toLocaleFormat(
              periodEndDate!,
              HEADER_INFO_DATE_FORMAT,
            ),
          },
        ),
      })
    }
  }, [lastBalanceSheetData])

  return (
    <Root>
      <TableBody
        getFooterHeight={getFooterHeight}
        headerHeight={HEADER_HEIGHT}
        isLoading={isLoading}
        rowsCount={filteredItems.length}
        tableOverwriteCSS={tableFirstColumnCSS}
        onResize={onResize}>
        <Column
          allowCellsRecycling
          fixed
          cell={
            <SidebarDataCell
              data={filteredItems}
              onToggleExpandRow={handleToggleExpandRow}
            />
          }
          columnKey="sidebar"
          footer={<SidebarFooterCell />}
          header={<SidebarHeaderCell title="Статьи" />}
          width={getSidebarWidth(tableSize.current.width)}
        />
        <Column
          allowCellsRecycling
          fixed
          cell={<TotalBalanceDataCell columnIndex={0} data={filteredItems} />}
          columnKey="totalStart"
          footer={<TotalBalanceFooterCell />}
          header={<TotalBalanceHeaderCell title={periodData.periodStartDate} />}
          width={TOTALS_WIDTH}
        />
        <Column
          allowCellsRecycling
          fixed
          cell={<TotalBalanceDataCell columnIndex={1} data={filteredItems} />}
          columnKey="totalEnd"
          footer={<TotalBalanceFooterCell />}
          header={<TotalBalanceHeaderCell title={periodData.periodEndDate} />}
          width={TOTALS_WIDTH}
        />
      </TableBody>
    </Root>
  )
}
