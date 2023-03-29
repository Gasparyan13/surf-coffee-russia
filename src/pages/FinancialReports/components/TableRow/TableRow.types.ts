import { RowCellProps } from '../TableCell/TableCell.types'

export type TableColumnType = 'MAIN' | 'SIDEBAR'

export type Props = {
  isCurrentMonth?: boolean
  tableColumnType: TableColumnType
  onPlanCellClick?: () => void
  onFactCellClick?: () => void
} & RowCellProps
