import { PATHS } from '@constants'

import { ReportType } from '../../components/TableCell/TableCell.types'

export const SALARY_EXPENSES_IDS = [40, 43, 44]

export const reportTypes: Record<string, ReportType> = {
  [PATHS.financialReports.pnl]: 'pnl',
  [PATHS.financialReports.cashFlow]: 'cashFlow',
}
