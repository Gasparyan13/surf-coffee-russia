import { TableRowProps } from '@mui/material/TableRow'

export type Props = {
  index: number
  onClick?: (rowIndex: number) => void
} & Pick<TableRowProps, 'children'>
