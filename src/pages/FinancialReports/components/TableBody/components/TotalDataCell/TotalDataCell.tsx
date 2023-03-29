import React, { useMemo } from 'react'

import { RowCellProps } from '../../../TableCell/TableCell.types'
import { TableRow } from '../../../TableRow'
import { ParsedBudgetItem } from '../../TableBody.types'
import * as T from './TotalDataCell.types'
import {
  TEST_ID_TOTAL_DATA_FACT,
  TEST_ID_TOTAL_DATA_PLAN,
} from './constants/testIds'

export const TotalDataCell: React.FC<T.Props> = ({
  columnType,
  data,
  rowIndex = 0,
}) => {
  // rowIndex may be late when filtering and item will be undefined
  const item: ParsedBudgetItem | undefined = data[rowIndex]
  const isFactCellOnly = columnType === 'FACT'

  const cells = useMemo(() => {
    const plan = item?.total?.plan
    const fact = item?.total?.fact
    const leftCellText = `${plan}`
    const rightCellText = isFactCellOnly ? undefined : `${fact}`

    const rowCells: RowCellProps = {
      leftCell: isFactCellOnly
        ? undefined
        : {
            text: leftCellText,
            type: 'BOLD',
            isNumber: true,
            id: item?.budgetItemId,
            testId: `${TEST_ID_TOTAL_DATA_PLAN}-${item?.budgetItemId}`,
          },
      rightCell: {
        text: rightCellText,
        type: 'REGULAR',
        isNumber: true,
        id: item?.budgetItemId,
        testId: `${TEST_ID_TOTAL_DATA_FACT}-${item?.budgetItemId}`,
      },
    }

    return rowCells
  }, [item, isFactCellOnly])

  return (
    <TableRow
      leftCell={cells.leftCell}
      rightCell={cells.rightCell}
      tableColumnType="SIDEBAR"
    />
  )
}
