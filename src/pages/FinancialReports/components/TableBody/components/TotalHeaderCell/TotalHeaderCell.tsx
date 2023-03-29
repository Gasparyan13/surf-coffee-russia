import React, { useMemo } from 'react'

import { Typography } from '@uiKit'

import { TableCellProps } from '../../../TableCell/TableCell.types'
import { TableRow } from '../../../TableRow'
import * as Styled from './TotalHeaderCell.styled'
import * as T from './TotalHeaderCell.types'
import {
  TEST_ID_TOTAL_HEADER_PLAN,
  TEST_ID_TOTAL_HEADER_FACT,
} from './constants/testIds'

export const TotalHeaderCell: React.FC<T.Props> = ({ columnType }) => {
  const tableRowProps = useMemo(() => {
    const leftCell: TableCellProps = {
      text: 'План',
      type: 'TITLE',
      disabled: true,
      id: 1,
      testId: TEST_ID_TOTAL_HEADER_PLAN,
    }
    const rightCell: TableCellProps = {
      text: 'Факт',
      type: 'TITLE',
      disabled: true,
      id: 1,
      testId: TEST_ID_TOTAL_HEADER_FACT,
    }

    if (columnType === 'FACT') return { rightCell }

    return { leftCell, rightCell }
  }, [columnType])

  return (
    <Styled.Root>
      <Typography variant="H4">Итого</Typography>
      <TableRow
        leftCell={tableRowProps.leftCell}
        rightCell={tableRowProps.rightCell}
        tableColumnType="SIDEBAR"
      />
    </Styled.Root>
  )
}
