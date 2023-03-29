import { ColumnType } from '../../TableBody.types'

export type Props = {
  monthName: string
  columnIndex: number
  currentMonthNumber: number
  columnType: ColumnType
  year: number
  isCurrentYear: boolean
}
