import { TableColumnType } from '../../../TableRow/TableRow.types'
import { TableCellProps } from '../../TableCell.types'

export type Props = {
  testId?: string
  tableColumnType: TableColumnType
} & Omit<TableCellProps, 'id'>
