export type Props<T> = {
  rowIndex?: number // It's ColumnCellProps['rowIndex'] from fixed-data-table-2
  data: T[]
  onToggleExpandRow: (tableRowId: number) => void
  searchValue?: string
}
