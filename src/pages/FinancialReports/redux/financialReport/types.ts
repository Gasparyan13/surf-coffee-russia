import { Nullable } from '@common/types/Nullable'

import {
  GetAnalyticsCashFlowReportApiArg,
  GetAnalyticsPlanFactExpensesReportApiArg,
  GetAnalyticsBalanceSheetByEnterpriseIdApiArg,
} from '@rtkApi/modules/__generated__/analytics'

import { ReportType } from '../../components/TableCell/TableCell.types'

type LastReqArgs =
  | GetAnalyticsCashFlowReportApiArg
  | GetAnalyticsPlanFactExpensesReportApiArg
  | GetAnalyticsBalanceSheetByEnterpriseIdApiArg

export type SliceState = {
  lastReportReqArgs: Nullable<LastReqArgs>
  search: Record<ReportType, string>
}
