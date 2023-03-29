import { SliceState } from '@pages/FinancialReports/redux/financialReport/types'

export const financialReportConfig = ({
  lastReportReqArgs = null,
  search = {
    pnl: '',
    cashFlow: '',
  },
}: Partial<SliceState>): SliceState => ({
  lastReportReqArgs,
  search,
})
