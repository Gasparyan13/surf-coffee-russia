import { Collapse } from '@mui/material'
import MuiTableCell from '@mui/material/TableCell'
import React, { useCallback, useState, Fragment } from 'react'

import { SvgArrowIcon } from '../../../../../IconComponents/SvgArrowIcon'
import { TableCell } from '../TableCell'
import * as Styled from './TableRowExpanded.styled'
import * as T from './TableRowExpanded.types'

export const TableRowExpanded: React.FC<T.Props> = ({
  children,
  columnsLength,
  content,
}) => {
  const [expanded, setExpanded] = useState(false)
  const handleToggleRow = useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  const colSpanWithIcon = columnsLength + 1

  return (
    <>
      <Styled.TableRow $expanded={expanded} onClick={handleToggleRow}>
        {children}
        <TableCell>
          <SvgArrowIcon
            css={Styled.arrowIconCSS}
            direction={expanded ? 'up' : 'down'}
          />
        </TableCell>
      </Styled.TableRow>
      <Styled.ExpandedContainerRow $expanded={expanded}>
        <MuiTableCell
          colSpan={colSpanWithIcon}
          style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse unmountOnExit in={expanded} timeout="auto">
            {content}
          </Collapse>
        </MuiTableCell>
      </Styled.ExpandedContainerRow>
    </>
  )
}
