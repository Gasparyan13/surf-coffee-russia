import MuiTableRow from '@mui/material/TableRow'

import styled from '@common/styled'

export const Row = styled(MuiTableRow)<{
  $borderColor: string
  $hasBorderTop: boolean
  $hasPaddingLeft: boolean
}>`
  height: 66px;
  ${({ $borderColor, $hasBorderTop, $hasPaddingLeft }) => `
.MuiTableCell-root {
  ${$hasPaddingLeft ? 'padding-left: 16px;' : ''}
  border-top: ${$hasBorderTop ? `1px solid ${$borderColor}` : 'none'};
  border-bottom: none;
}
`}
`
