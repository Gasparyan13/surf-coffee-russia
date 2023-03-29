import { ReportType } from '../TableCell/TableCell.types'

export type Props = {
  budgetItemId?: number
  budgetItemName?: string
  yearMonth?: string
  open: boolean
  onClose: () => void
  reportType: ReportType
}
