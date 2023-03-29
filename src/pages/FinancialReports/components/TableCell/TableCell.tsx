import React, { useMemo } from 'react'

import {
  CURRENT_MONTH_CELL_SELECTOR,
  MAIN_CONTENT_CELL_SELECTOR,
} from '../TableBody/constants/classNames'
import * as Styled from './TableCell.styled'
import * as T from './TableCell.types'

export const TableCell: React.FC<T.Props> = ({
  text,
  isCurrentMonth,
  isEditable,
  isNumber,
  children,
  tableColumnType,
  onClick,
}) => {
  const rootClasses = useMemo(() => {
    if (isCurrentMonth) return CURRENT_MONTH_CELL_SELECTOR
    if (tableColumnType === 'MAIN') return MAIN_CONTENT_CELL_SELECTOR
  }, [isCurrentMonth, tableColumnType])

  return (
    <Styled.Root
      $isAddIcon={!text && isEditable}
      $isCurrentMonth={isCurrentMonth}
      $isHoverable={isNumber && isEditable}
      $tableColumnType={tableColumnType}
      className={rootClasses}
      onClick={onClick}>
      {children}
    </Styled.Root>
  )
}
