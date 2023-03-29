import React from 'react'

import * as Styled from './TableCell.styled'
import * as T from './TableCell.types'

export const TableCell: React.FC<T.CellProps> = ({
  children,
  rowType,
  width,
  isCurrentDay,
}) => {
  return (
    <Styled.Root $isCurrentDay={isCurrentDay} $rowType={rowType} $width={width}>
      {children}
    </Styled.Root>
  )
}
