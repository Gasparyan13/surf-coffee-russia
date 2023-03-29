import { RootState } from '@store/rootConfig'

import { ReportType } from '../../components/TableCell/TableCell.types'
import { SliceState } from './types'

export const getFinancialReportReqArgs = (
  state: RootState,
): SliceState['lastReportReqArgs'] => state.financialReport.lastReportReqArgs

export const getSearch =
  (reportType: ReportType) =>
  (state: RootState): string =>
    state.financialReport.search[reportType]
