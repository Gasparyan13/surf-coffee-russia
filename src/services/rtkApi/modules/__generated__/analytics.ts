import { emptySplitApi as api } from '../../core/emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postAnalyticsBalanceSheetActionsClosePeriod: build.mutation<
      PostAnalyticsBalanceSheetActionsClosePeriodApiResponse,
      PostAnalyticsBalanceSheetActionsClosePeriodApiArg
    >({
      query: (queryArg) => ({
        url: `/analytics/balance_sheet/actions/close_period`,
        method: 'POST',
        body: queryArg.closePeriodActionDto,
      }),
    }),
    getAnalyticsPnlByEnterpriseId: build.query<
      GetAnalyticsPnlByEnterpriseIdApiResponse,
      GetAnalyticsPnlByEnterpriseIdApiArg
    >({
      query: (queryArg) => ({
        url: `/analytics/pnl/${queryArg.enterpriseId}`,
        params: { yearMonth: queryArg.yearMonth },
      }),
    }),
    getAnalyticsPnlByEnterpriseIdAndYear: build.query<
      GetAnalyticsPnlByEnterpriseIdAndYearApiResponse,
      GetAnalyticsPnlByEnterpriseIdAndYearApiArg
    >({
      query: (queryArg) => ({
        url: `/analytics/pnl/${queryArg.enterpriseId}/${queryArg.year}`,
      }),
    }),
    getAnalyticsPlanFactExpensesReport: build.query<
      GetAnalyticsPlanFactExpensesReportApiResponse,
      GetAnalyticsPlanFactExpensesReportApiArg
    >({
      query: (queryArg) => ({
        url: `/analytics/plan_fact_expenses_report`,
        params: { enterpriseId: queryArg.enterpriseId, year: queryArg.year },
      }),
    }),
    getAnalyticsCashFlowReport: build.query<
      GetAnalyticsCashFlowReportApiResponse,
      GetAnalyticsCashFlowReportApiArg
    >({
      query: (queryArg) => ({
        url: `/analytics/cash_flow_report`,
        params: { enterpriseId: queryArg.enterpriseId, year: queryArg.year },
      }),
    }),
    getAnalyticsBalanceSheetByEnterpriseId: build.query<
      GetAnalyticsBalanceSheetByEnterpriseIdApiResponse,
      GetAnalyticsBalanceSheetByEnterpriseIdApiArg
    >({
      query: (queryArg) => ({
        url: `/analytics/balance_sheet/${queryArg.enterpriseId}`,
        params: { period: queryArg.period },
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type PostAnalyticsBalanceSheetActionsClosePeriodApiResponse =
  /** status 200 Период закрыт. */ string
export type PostAnalyticsBalanceSheetActionsClosePeriodApiArg = {
  closePeriodActionDto: ClosePeriodActionDto
}
export type GetAnalyticsPnlByEnterpriseIdApiResponse =
  /** status 200 Отчет выгружен успешно */ PnLReportViewDto[]
export type GetAnalyticsPnlByEnterpriseIdApiArg = {
  /** id предприятия */
  enterpriseId: number
  /** отчетный период (год и месяц) */
  yearMonth: string
}
export type GetAnalyticsPnlByEnterpriseIdAndYearApiResponse =
  /** status 200 Отчет выгружен успешно */ IikoYearReportDto
export type GetAnalyticsPnlByEnterpriseIdAndYearApiArg = {
  /** id предприятия */
  enterpriseId: number
  /** год */
  year: number
}
export type GetAnalyticsPlanFactExpensesReportApiResponse =
  /** status 200 Представление выгружено успешно */ PlanFactExpensesReportGetDto
export type GetAnalyticsPlanFactExpensesReportApiArg = {
  /** id предприятия */
  enterpriseId: number
  /** год для формирования представления */
  year: number
}
export type GetAnalyticsCashFlowReportApiResponse =
  /** status 200 Представление выгружено успешно */ CashFlowReportViewDto
export type GetAnalyticsCashFlowReportApiArg = {
  /** id предприятия */
  enterpriseId: number
  /** год для формирования представления */
  year: number
}
export type GetAnalyticsBalanceSheetByEnterpriseIdApiResponse =
  /** status 200 Получен баланс предприятия на текущую дату */ BalanceSheetSectionalViewDto
export type GetAnalyticsBalanceSheetByEnterpriseIdApiArg = {
  /** id предприятия */
  enterpriseId: number
  /** Период в формате год-месяц yyyy-MM */
  period?: string
}
export type ClosePeriodActionDto = {
  enterpriseId: number
  period: string
}
export type SalesReportItemViewDto = {
  id?: number
  itemName?: string
  income?: number
  expense?: number
}
export type WriteOffReportItemViewDto = {
  id?: number
  itemName?: string
  writeOffSum?: number
}
export type PnLReportViewDto = {
  date?: string
  departmentCode?: string
  sampleStartDate?: string
  salesReportItems?: SalesReportItemViewDto[]
  writeOffReportItems?: WriteOffReportItemViewDto[]
  stockBalance?: number
}
export type IikoMonthSales = {
  month?: number
  income?: number
  expense?: number
}
export type IikoMonthWriteOffs = {
  month?: number
  sum?: number
}
export type IikoYearDataByBudgetItem = {
  budgetItemName?: string
  monthSales?: IikoMonthSales[]
  monthWriteOffs?: IikoMonthWriteOffs[]
}
export type IikoYearReportDto = {
  year?: number
  createDate?: string
  yearDataByBudgetItems?: IikoYearDataByBudgetItem[]
}
export type BudgetItemViewDto = {
  id?: number
  name?: string
  rootId?: number
  level?: number
  parentItemId?: number
  children?: number[]
  isExpense?: boolean
  isExternal?: boolean
  isCapitalAssets?: boolean
}
export type PlanFactExpensesForMonthByBudgetItemGetDto = {
  plan?: number
  fact?: number
  isActivePlanCell?: boolean
  isActiveFactCell?: boolean
}
export type PlanFactTotalExpensesForYearByBudgetItemGetDto = {
  plan?: number
  fact?: number
}
export type PlanFactExpensesForYearByBudgetItemGetDto = {
  budgetItemId?: number
  budgetItemName?: string
  parent?: number
  negatedItems?: BudgetItemViewDto[]
  months?: {
    [key: string]: PlanFactExpensesForMonthByBudgetItemGetDto
  }
  total?: PlanFactTotalExpensesForYearByBudgetItemGetDto
}
export type PlanFactExpensesReportData = {
  budgetItems?: PlanFactExpensesForYearByBudgetItemGetDto[]
}
export type PlanFactExpensesReportGetDto = {
  type?: string
  year?: number
  createDate?: string
  data?: PlanFactExpensesReportData
}
export type CashFlowForMonthByBudgetItemViewDto = {
  plan?: number
  fact?: number
  isActivePlanCell?: boolean
  isActiveFactCell?: boolean
}
export type CashFlowTotalExpensesForYearByBudgetItemGetDto = {
  plan?: number
  fact?: number
}
export type CashFlowReportForYearByBudgetItemViewDto = {
  budgetItemId?: number
  budgetItemName?: string
  parent?: number
  negatedItems?: BudgetItemViewDto[]
  months?: {
    [key: string]: CashFlowForMonthByBudgetItemViewDto
  }
  total?: CashFlowTotalExpensesForYearByBudgetItemGetDto
}
export type CashFlowReportData = {
  budgetItems?: CashFlowReportForYearByBudgetItemViewDto[]
}
export type CashFlowReportViewDto = {
  type?: string
  year?: number
  createDate?: string
  data?: CashFlowReportData
}
export type BalanceSheetItemViewDto = {
  id?: number
  parentId?: number
  itemName?: string
  totalSum?: number
}
export type BalanceSheetViewDto = {
  periodDate?: string
  assets?: BalanceSheetItemViewDto[]
  obligations?: BalanceSheetItemViewDto[]
  assetsTotal?: number
  obligationsTotal?: number
  sumMismatch?: boolean
}
export type BalanceSheetSectionalViewDto = {
  periodStartSheet?: BalanceSheetViewDto
  periodEndSheet?: BalanceSheetViewDto
}
export const {
  usePostAnalyticsBalanceSheetActionsClosePeriodMutation,
  useGetAnalyticsPnlByEnterpriseIdQuery,
  useLazyGetAnalyticsPnlByEnterpriseIdQuery,
  useGetAnalyticsPnlByEnterpriseIdAndYearQuery,
  useLazyGetAnalyticsPnlByEnterpriseIdAndYearQuery,
  useGetAnalyticsPlanFactExpensesReportQuery,
  useLazyGetAnalyticsPlanFactExpensesReportQuery,
  useGetAnalyticsCashFlowReportQuery,
  useLazyGetAnalyticsCashFlowReportQuery,
  useGetAnalyticsBalanceSheetByEnterpriseIdQuery,
  useLazyGetAnalyticsBalanceSheetByEnterpriseIdQuery,
} = injectedRtkApi
