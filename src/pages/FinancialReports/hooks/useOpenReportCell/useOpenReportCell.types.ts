import { Nullable } from '@common/types/Nullable'

import { GetFinancialExpensesPnlOperationsViewApiArg } from '@rtkApi/modules/__generated__/financial'

import { ReportType } from '../../components/TableCell/TableCell.types'

export type ReportDrawerType = 'WageFund' | 'FactOperations' | 'PlanOperations'
export type PlanOrFactType = 'plan' | 'fact'

export type RootHandlerConfig = {
  isEditable?: boolean
  budgetItemName: string
  text?: string
  date: string
  planOrFactType: PlanOrFactType
} & Omit<GetFinancialExpensesPnlOperationsViewApiArg, 'enterpriseId'>

type BaseReportPopovers = {
  budgetItemId: number
  budgetItemName: string
  date: string
} & Pick<RootHandlerConfig, 'yearMonth'>

type OpenDrawerSecondArg = {
  drawerType: Nullable<ReportDrawerType>
}

export type ReportDrawer = Nullable<
  | {
      planOrFactType: string
      text?: string
      drawerType: OpenDrawerSecondArg['drawerType']
    } & BaseReportPopovers
>

export type ReportModalDrawerHandlers = {
  setDrawer?: (arg: ReportDrawer) => void
}

export type InnerCellHandlerArg = Omit<RootHandlerConfig, 'planOrFactType'>

export type HookReturn = {
  isOpen: boolean
  handleCellClick: (
    planOrFactType: PlanOrFactType,
  ) => (args: InnerCellHandlerArg) => void
  drawer: Nullable<ReportDrawer>
  handleDrawerClose: () => void
  reportType: ReportType
}

export type OpenDrawerFunc = (
  config: RootHandlerConfig,
  additional: OpenDrawerSecondArg,
) => void
