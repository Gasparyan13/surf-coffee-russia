import MuiTableRow from '@mui/material/TableRow'
import React, { useCallback } from 'react'

import * as Styled from './TableRow.styled'
import * as T from './TableRow.types'

export const TableRow: React.FC<T.Props> = ({ index, children, onClick }) => {
  const handleRowClick = useCallback(() => {
    if (onClick) onClick(index)
  }, [index, onClick])

  return (
    <MuiTableRow css={Styled.tableRowCSS} onClick={handleRowClick}>
      {children}
    </MuiTableRow>
  )
}
