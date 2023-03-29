import { getCurrentMonth, getCurrentYear } from '@utils'

import { FinReportCtxType } from '@pages/FinancialReports/containers/FinancialReportCtx'

import { enterpriseId as testEnterpriseId } from '../store/app'

export type ConfigFinReportCtxValueParams = Partial<FinReportCtxType>

export const configFinReportCtxValue = ({
  enterpriseId = testEnterpriseId,
  year = getCurrentYear(),
  isCurrentYear = true,
  currentMonthNumber = getCurrentMonth(),
  handleChangeYear = () => {},
  handleShowMessage = () => {},
  handleCellClick = () => () => {},
  expensesDate = '2022-12-01',
  yearMonth = '2022-12',
  message = {
    type: 'warning',
    text: 'message',
  },
}: ConfigFinReportCtxValueParams): FinReportCtxType => ({
  enterpriseId,
  year,
  isCurrentYear,
  currentMonthNumber,
  handleChangeYear,
  handleShowMessage,
  expensesDate,
  yearMonth,
  handleCellClick,
  message,
})

export const mockConfigFinReportCtxValue = configFinReportCtxValue({})
