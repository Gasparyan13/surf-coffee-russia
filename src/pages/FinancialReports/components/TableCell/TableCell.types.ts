import { ReportModalDrawerHandlers } from '../../hooks/useOpenReportCell/useOpenReportCell.types'
import { TableColumnType } from '../TableRow/TableRow.types'
import { FinReportTableCellText } from './components/CellText'

export type FinReportIsActive = {
  isCurrentMonth?: boolean
}

export type ReportType = 'pnl' | 'cashFlow'

export type Props = React.PropsWithChildren & {
  tableColumnType: TableColumnType
  onClick?: () => void
} & FinReportIsActive &
  Omit<TableCellProps, 'id' | 'type'> &
  ReportModalDrawerHandlers

export type GeneralTableCellProps = {
  text?: string
  type: FinReportTableCellText
  disabled?: boolean
}

export type TableCellProps = {
  id: number
  isNumber?: boolean
  isEditable?: boolean
  tooltipTitle?: string
  testId?: string
} & GeneralTableCellProps

export type RowCellProps = {
  rightCell?: TableCellProps
  leftCell?: TableCellProps
}
