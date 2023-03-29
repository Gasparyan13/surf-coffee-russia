import React from 'react'

import { TableCell } from '../TableCell'
import { CellContent } from '../TableCell/components/CellContent'
import * as Styled from './TableRow.styled'
import * as T from './TableRow.types'

export const TableRow: React.FC<T.Props> = ({
  leftCell,
  rightCell,
  isCurrentMonth,
  tableColumnType,
  onPlanCellClick,
  onFactCellClick,
}) => (
  <Styled.Root>
    {leftCell && (
      <TableCell
        isCurrentMonth={isCurrentMonth}
        isEditable={leftCell.isEditable}
        isNumber={leftCell.isNumber}
        tableColumnType={tableColumnType}
        text={leftCell.text}
        onClick={onPlanCellClick}>
        <CellContent
          disabled={leftCell.disabled}
          isEditable={leftCell.isEditable}
          isNumber={leftCell.isNumber}
          tableColumnType={tableColumnType}
          testId={leftCell.testId}
          text={leftCell.text}
          type={leftCell.type}
        />
      </TableCell>
    )}
    {rightCell && (
      <TableCell
        isCurrentMonth={isCurrentMonth}
        isEditable={rightCell.isEditable}
        isNumber={rightCell.isNumber}
        tableColumnType={tableColumnType}
        text={rightCell.text}
        onClick={onFactCellClick}>
        <CellContent
          disabled={rightCell.disabled}
          isEditable={rightCell.isEditable}
          isNumber={rightCell.isNumber}
          tableColumnType={tableColumnType}
          testId={rightCell.testId}
          text={rightCell.text}
          type={rightCell.type}
        />
      </TableCell>
    )}
  </Styled.Root>
)
