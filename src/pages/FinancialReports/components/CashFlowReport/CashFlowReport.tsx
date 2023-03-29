import { Column } from 'fixed-data-table-2'
import React, { useCallback } from 'react'

import { MONTHS_RU } from '@constants'

import { useLazyGetAnalyticsCashFlowReportQuery } from '@rtkApi/modules/__generated__/analytics'

import { useFinancialReportCtx } from '../../containers/FinancialReportCtx'
import { useSharedFinancialReportData } from '../../hooks/useSharedFinancialReportData'
import { TableBody } from '../TableBody'
import { MonthFooterCell } from '../TableBody/components/MonthFooterCell'
import { MonthHeaderCell } from '../TableBody/components/MonthHeaderCell'
import { SidebarDataCell } from '../TableBody/components/SidebarDataCell'
import { SidebarFooterCell } from '../TableBody/components/SidebarFooterCell'
import { SidebarHeaderSearchCell } from '../TableBody/components/SidebarHeaderSearchCell'
import { TotalDataCell } from '../TableBody/components/TotalDataCell'
import { TotalFooterCell } from '../TableBody/components/TotalFooterCell'
import { TotalHeaderCell } from '../TableBody/components/TotalHeaderCell'
import {
  SIDEBAR_TOTALS_WIDTH,
  SIDEBAR_WIDTH,
} from '../TableBody/constants/width'
import { Cell } from '../TableCell/components/Cell'
import { REPORT_TYPE } from './constants/types'

export const CashFlowReport: React.FC = () => {
  const [
    apiAnalyticsCashFlowReport,
    { data: lastResponseData, isLoading: isLoadingData },
  ] = useLazyGetAnalyticsCashFlowReportQuery()

  const { year, isCurrentYear, currentMonthNumber, handleCellClick } =
    useFinancialReportCtx()

  const handleGetCashFlowReportData = useCallback(
    async (id: number, searchYear: number) => {
      apiAnalyticsCashFlowReport({
        year: searchYear,
        enterpriseId: id,
      })
    },
    [apiAnalyticsCashFlowReport],
  )

  const {
    isLoading,
    filteredBudgetItems,
    scrollToColumn,
    getColumnWidth,
    handleToggleExpandRow,
    searchValue,
    handleChangeSearchValue,
    getFooterHeight,
  } = useSharedFinancialReportData({
    reportType: REPORT_TYPE,
    request: handleGetCashFlowReportData,
    lastResponseData,
  })

  return (
    <TableBody
      getFooterHeight={getFooterHeight}
      isLoading={isLoading || isLoadingData}
      rowsCount={filteredBudgetItems.length}
      scrollToColumn={scrollToColumn}>
      <Column
        allowCellsRecycling
        fixed
        cell={
          <SidebarDataCell
            data={filteredBudgetItems}
            searchValue={searchValue}
            onToggleExpandRow={handleToggleExpandRow}
          />
        }
        columnKey="sidebar"
        footer={
          <SidebarFooterCell
            hasBorder
            showPlaceholder={!filteredBudgetItems.length}
          />
        }
        header={
          <SidebarHeaderSearchCell
            value={searchValue}
            onChange={handleChangeSearchValue}
          />
        }
        width={SIDEBAR_WIDTH}
      />
      <Column
        allowCellsRecycling
        fixed
        cell={
          <TotalDataCell columnType="PLAN-FACT" data={filteredBudgetItems} />
        }
        columnKey="sidebarTotals"
        footer={<TotalFooterCell />}
        header={<TotalHeaderCell columnType="PLAN-FACT" />}
        width={SIDEBAR_TOTALS_WIDTH}
      />
      {MONTHS_RU.map((month, i) => (
        <Column
          key={month}
          allowCellsRecycling
          cell={
            <Cell
              columnType="PLAN-FACT"
              currentMonthNumber={currentMonthNumber}
              data={filteredBudgetItems}
              monthColumnIndex={i}
              onFactCellClick={handleCellClick('fact')}
              onPlanCellClick={handleCellClick('plan')}
            />
          }
          columnKey={month}
          footer={
            <MonthFooterCell
              currentMonthNumber={currentMonthNumber}
              monthColumnIndex={i}
            />
          }
          header={
            <MonthHeaderCell
              columnIndex={i}
              columnType="PLAN-FACT"
              currentMonthNumber={currentMonthNumber}
              isCurrentYear={isCurrentYear}
              monthName={month}
              year={year}
            />
          }
          width={getColumnWidth(i)}
        />
      ))}
    </TableBody>
  )
}
