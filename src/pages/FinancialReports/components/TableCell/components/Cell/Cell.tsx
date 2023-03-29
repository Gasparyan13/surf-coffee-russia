import React, { useCallback, useMemo } from 'react'

import { MONTHS_EN_SHORT, YEAR_MONTH_FORMAT } from '@constants'

import { useFinancialReportCtx } from '@pages/FinancialReports/containers/FinancialReportCtx'
import { InnerCellHandlerArg } from '@pages/FinancialReports/hooks/useOpenReportCell/useOpenReportCell.types'

import { getFormattedFirstDayOfMonth } from '../../../FinancialReportLayout/utils/getters'
import { TableRow } from '../../../TableRow'
import { TableCellProps } from '../../TableCell.types'
import { getCellData } from '../../utils/getCellData'
import * as T from './Cell.types'

export const Cell: React.FC<T.Props> = ({
  data,
  monthColumnIndex,
  currentMonthNumber,
  columnType,
  rowIndex = 0,
  onPlanCellClick,
  onFactCellClick,
}) => {
  const item = data[rowIndex]
  const currentEngMonth = MONTHS_EN_SHORT[monthColumnIndex]
  const isHalfCell =
    monthColumnIndex > currentMonthNumber || columnType === 'FACT'

  const { year } = useFinancialReportCtx()

  const tableRowProps = useMemo(() => {
    const { leftCell, rightCell } = getCellData({
      currentEngMonth,
      item,
    })

    if (isHalfCell && columnType.includes('PLAN')) return { leftCell }
    if (isHalfCell) return { rightCell }

    return { leftCell, rightCell }
  }, [currentEngMonth, item, isHalfCell, columnType])

  const handleCellClick = useCallback(
    (
        cellType: 'leftCell' | 'rightCell',
        cellClickHandler?: (args: InnerCellHandlerArg) => void,
      ) =>
      () => {
        if (!cellClickHandler || !tableRowProps?.[cellType]) return

        const { isEditable, text } = tableRowProps[cellType] as TableCellProps

        const { budgetItemName, budgetItemId } = item
        const args: InnerCellHandlerArg = {
          isEditable,
          budgetItemName,
          text,
          budgetItemId,
          date: getFormattedFirstDayOfMonth({
            year,
            month: monthColumnIndex,
          }),
          yearMonth: getFormattedFirstDayOfMonth({
            year,
            month: monthColumnIndex,
            format: YEAR_MONTH_FORMAT,
          }),
        }

        cellClickHandler(args)
      },
    [item, monthColumnIndex, tableRowProps, year],
  )

  return (
    <TableRow
      isCurrentMonth={currentMonthNumber === monthColumnIndex}
      leftCell={tableRowProps.leftCell}
      rightCell={tableRowProps.rightCell}
      tableColumnType="MAIN"
      onFactCellClick={handleCellClick('rightCell', onFactCellClick)}
      onPlanCellClick={handleCellClick('leftCell', onPlanCellClick)}
    />
  )
}
