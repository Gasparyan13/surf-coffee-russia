import { ColumnType, ParsedBudgetItem } from '../../TableBody.types'

export type Props = {
  rowIndex?: number // It's ColumnCellProps['rowIndex'] from fixed-data-table-2
  columnType: ColumnType
  data: ParsedBudgetItem[]
}
