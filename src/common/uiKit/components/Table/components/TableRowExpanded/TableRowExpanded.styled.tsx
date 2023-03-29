import { css } from '@emotion/react'
import MuiTableRow from '@mui/material/TableRow'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

import { baseTableRowCSS } from '../../Table.styled'

export const arrowIconCSS = css`
  && {
    margin-top: 7px;
  }
`

const expandedRowCSS = css`
  ${baseTableRowCSS}
  background-color: ${theme.colors.asphaltSuperLight};
  .MuiTableCell-root {
    border-bottom: 1px solid ${theme.colors.asphaltLight};
  }
`

export const TableRow = styled(MuiTableRow)<{ $expanded: boolean }>`
  ${({ $expanded }) => ($expanded ? expandedRowCSS : baseTableRowCSS)}
  cursor: pointer;
  .MuiTableCell-root {
    height: 48px;
    padding: 0 16px;
  }
`

export const ExpandedContainerRow = styled(MuiTableRow)<{ $expanded: boolean }>`
  ${({ $expanded }) =>
    $expanded
      ? expandedRowCSS
      : `
      && {
        .MuiTableCell-root {
          border-bottom: none;
        }
      }
    `}
`
