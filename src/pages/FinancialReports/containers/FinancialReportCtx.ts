import { Nullable } from '@common/types/Nullable'

import { createCtx } from '@helpers/createCtx'

import { FinReportHeaderMessage } from '../components/FinReportHeader/FinReportHeader.types'
import { HookReturn } from '../hooks/useOpenReportCell/useOpenReportCell.types'

export type FinReportCtxType = {
  enterpriseId: number
  year: number
  isCurrentYear: boolean
  currentMonthNumber: number
  handleChangeYear: (newYear: string) => void
  handleShowMessage: (newMessage: FinReportHeaderMessage | null) => void
  expensesDate: string
  yearMonth: string
  handleCellClick: HookReturn['handleCellClick']
  message: Nullable<FinReportHeaderMessage>
}

export const [useFinancialReportCtx, FinancialReportProvider] =
  createCtx<FinReportCtxType>()
