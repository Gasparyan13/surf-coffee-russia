import React, { useMemo } from 'react'

import { mt } from '@common/common.styled'

import { Typography } from '@uiKit'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import { TableCellProps } from '../../../TableCell/TableCell.types'
import { TableRow } from '../../../TableRow'
import * as Styled from './MonthHeaderCell.styled'
import * as T from './MonthHeaderCell.types'
import {
  TEST_ID_MONTH_HEADER,
  TEST_ID_MONTH_HEADER_FACT,
  TEST_ID_MONTH_HEADER_PLAN,
} from './constants/testIds'

export const MonthHeaderCell: React.FC<T.Props> = ({
  currentMonthNumber,
  columnIndex,
  monthName,
  year,
  isCurrentYear,
  columnType,
}) => {
  const isHalfCell =
    (columnIndex > currentMonthNumber && isCurrentYear) || columnType === 'FACT'
  const isCurrentMonth = currentMonthNumber === columnIndex

  const tableRowProps = useMemo(() => {
    const leftCell: TableCellProps = {
      text: 'План',
      type: 'TITLE',
      disabled: true,
      id: currentMonthNumber,
      testId: `${TEST_ID_MONTH_HEADER_PLAN}-${columnIndex}`,
    }
    const rightCell: TableCellProps = {
      text: 'Факт',
      type: 'TITLE',
      disabled: true,
      id: currentMonthNumber,
      testId: `${TEST_ID_MONTH_HEADER_FACT}-${columnIndex}`,
    }

    if (isHalfCell && columnType === 'PLAN-FACT') return { leftCell }
    if (isHalfCell) return { rightCell }

    return { leftCell, rightCell }
  }, [currentMonthNumber, isHalfCell, columnType, columnIndex])

  return (
    <div>
      <Styled.MonthBlock
        {...createTestId(`${TEST_ID_MONTH_HEADER}-${columnIndex}`)}
        $isCurrentMonth={isCurrentMonth}
        $isHalfCell={isHalfCell}>
        <Styled.Year css={mt(8)}>{year}</Styled.Year>
        <Styled.Month>
          <Typography variant="H4">{monthName}</Typography>
        </Styled.Month>
      </Styled.MonthBlock>
      <TableRow
        isCurrentMonth={isCurrentMonth && isCurrentYear}
        leftCell={tableRowProps.leftCell}
        rightCell={tableRowProps.rightCell}
        tableColumnType="MAIN"
      />
    </div>
  )
}
