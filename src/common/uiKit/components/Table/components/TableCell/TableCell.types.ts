import { SerializedStyles } from '@emotion/react'
import { TableCellProps } from '@mui/material/TableCell'

export type Props = {
  fontStyle?: 'normal' | 'bold'
  cssStyle?: SerializedStyles
} & Pick<
  TableCellProps,
  'align' | 'children' | 'component' | 'variant' | 'colSpan' | 'width'
>
