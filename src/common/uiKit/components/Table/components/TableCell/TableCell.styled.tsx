import { css, SerializedStyles } from '@emotion/react'
import MuiTableCell from '@mui/material/TableCell'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

import {
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_NORMAL,
} from '../../../../constants/fontWeight'
import * as T from './TableCell.types'

export const headerCellCSS = css`
  color: ${theme.colors.wetAsphalt};
  font-size: 13px;
  padding: 11px 16px;
`

export const tableCellCSS = css`
  padding: 12px 16px;
  font-size: 14px;
  line-height: 24px;
  color: ${theme.colors.black};
`

export const TableCell = styled(MuiTableCell)<{
  $variant: T.Props['variant']
  $fontStyle: T.Props['fontStyle']
  $css?: SerializedStyles
}>`
  min-height: 48px;
  ${({ $variant }) => ($variant === 'head' ? headerCellCSS : tableCellCSS)}
  font-weight: ${({ $fontStyle }) =>
    $fontStyle === 'bold' ? FONT_WEIGHT_BOLD : FONT_WEIGHT_NORMAL};
  ${({ $css }) => $css}
`
