import { PlannedOperationWithAmountDto } from '@rtkApi/modules/__generated__/financial'

import { ReportType } from '../TableCell/TableCell.types'

export type Operation = Required<PlannedOperationWithAmountDto>
export type DrowerData = {
  operations: Operation[]
  total: number
}

export type Props = {
  budgetItemId?: number
  budgetItemName?: string
  yearMonth?: string
  open: boolean
  onClose: () => void
  reportType: ReportType
  planOrFactType?: string
}
