import { ParsedBalanceBudgetItem } from '../../TableBody.types'

export type Props = {
  rowIndex?: number // It's ColumnCellProps['rowIndex'] from fixed-data-table-2
  columnIndex: number
  columnKey?: string
  data: ParsedBalanceBudgetItem[]
}
