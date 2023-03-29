import { InnerCellHandlerArg } from '@pages/FinancialReports/hooks/useOpenReportCell/useOpenReportCell.types'

import {
  ColumnType,
  ParsedBudgetItem,
} from '../../../TableBody/TableBody.types'

export type Props = {
  rowIndex?: number // It's ColumnCellProps['rowIndex'] from fixed-data-table-2
  data: ParsedBudgetItem[]
  monthColumnIndex: number
  columnType: ColumnType
  currentMonthNumber: number
  onPlanCellClick?: (args: InnerCellHandlerArg) => void
  onFactCellClick?: (args: InnerCellHandlerArg) => void
}
