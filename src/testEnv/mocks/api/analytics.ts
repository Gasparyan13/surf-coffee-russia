import { DateHelper } from '@helpers'

import {
  BalanceSheetViewDto,
  CashFlowReportForYearByBudgetItemViewDto,
  CashFlowReportViewDto,
  GetAnalyticsBalanceSheetByEnterpriseIdApiResponse,
  PlanFactExpensesForYearByBudgetItemGetDto,
  PlanFactExpensesReportGetDto,
} from '@rtkApi/modules/__generated__/analytics'

const pastMonth = new Date()
pastMonth.setDate(1)
pastMonth.setMonth(pastMonth.getMonth() - 1)

const analyticsBalanceSheetViewStartMonth: BalanceSheetViewDto = {
  assets: [
    { itemName: 'test asset 1', totalSum: 0 },
    {
      itemName: 'test asset 2',
      totalSum: 100,
    },
  ],
  obligations: [{ itemName: 'test obligations 1', totalSum: 1000 }],
  assetsTotal: 100,
  obligationsTotal: 1000,
  sumMismatch: false,
  periodDate: DateHelper.toServerDateFormat(
    DateHelper.getStartOfMonth(new Date()),
  ),
}

const analyticsBalanceSheetViewEndMonth: BalanceSheetViewDto = {
  ...analyticsBalanceSheetViewStartMonth,
  periodDate: DateHelper.toServerDateFormat(
    DateHelper.getEndOfMonth(new Date()),
  ),
}

const analyticsBalanceSheetViewStartPastMonth: BalanceSheetViewDto = {
  ...analyticsBalanceSheetViewStartMonth,
  periodDate: DateHelper.toServerDateFormat(
    DateHelper.getStartOfMonth(pastMonth),
  ),
}

const analyticsBalanceSheetViewEndPastMonth: BalanceSheetViewDto = {
  ...analyticsBalanceSheetViewStartMonth,
  periodDate: DateHelper.toServerDateFormat(
    DateHelper.getEndOfMonth(pastMonth),
  ),
}

export const getAnalyticsBalanceSheetByEnterpriseIdApiResponse: GetAnalyticsBalanceSheetByEnterpriseIdApiResponse =
  {
    periodStartSheet: analyticsBalanceSheetViewStartMonth,
    periodEndSheet: analyticsBalanceSheetViewEndMonth,
  }

export const getAnalyticsBalanceSheetByEnterpriseIdApiResponsePastMonth: GetAnalyticsBalanceSheetByEnterpriseIdApiResponse =
  {
    periodStartSheet: analyticsBalanceSheetViewStartPastMonth,
    periodEndSheet: analyticsBalanceSheetViewEndPastMonth,
  }

export const getAnalyticsBalanceSheetByEnterpriseIdApiResponseSumMismatch: GetAnalyticsBalanceSheetByEnterpriseIdApiResponse =
  {
    periodStartSheet: {
      ...analyticsBalanceSheetViewStartMonth,
      sumMismatch: true,
    },
    periodEndSheet: {
      ...analyticsBalanceSheetViewEndMonth,
      sumMismatch: true,
    },
  }

export const getAnalyticsBalanceSheetByEnterpriseIdApiResponseSumMismatchPastMonth: GetAnalyticsBalanceSheetByEnterpriseIdApiResponse =
  {
    periodStartSheet: {
      ...analyticsBalanceSheetViewStartPastMonth,
      sumMismatch: true,
    },
    periodEndSheet: {
      ...analyticsBalanceSheetViewEndPastMonth,
      sumMismatch: true,
    },
  }

export const reportBudgetItem:
  | CashFlowReportForYearByBudgetItemViewDto
  | PlanFactExpensesForYearByBudgetItemGetDto = {
  budgetItemId: 1,
  budgetItemName: 'Выручка',
  months: {
    Jul: { isActivePlanCell: false, isActiveFactCell: false },
    Oct: {
      plan: 1200.0,
      fact: -42441.0,
      isActivePlanCell: false,
      isActiveFactCell: false,
    },
    Feb: { isActivePlanCell: false, isActiveFactCell: false },
    Apr: { isActivePlanCell: false, isActiveFactCell: false },
    Jun: { isActivePlanCell: false, isActiveFactCell: false },
    Aug: { isActivePlanCell: false, isActiveFactCell: false },
    Dec: { isActivePlanCell: false, isActiveFactCell: false },
    May: { isActivePlanCell: false, isActiveFactCell: false },
    Nov: {
      plan: 2645.0,
      fact: -99.0,
      isActivePlanCell: true,
      isActiveFactCell: true,
    },
    Jan: { isActivePlanCell: false, isActiveFactCell: false },
    Mar: { isActivePlanCell: false, isActiveFactCell: false },
    Sep: { isActivePlanCell: false, isActiveFactCell: false },
  },
  total: { plan: 3845.0, fact: -42540.0 },
}

export const getAnalyticsCashFlowReportResponse: CashFlowReportViewDto = {
  createDate: '2022-11-21',
  data: {
    budgetItems: [
      reportBudgetItem,
      {
        ...reportBudgetItem,
        budgetItemId: 2,
        parent: 1,
        budgetItemName: 'Напитки',
      },
      {
        ...reportBudgetItem,
        budgetItemId: 3,
        parent: 2,
        budgetItemName: 'Сок',
      },
      {
        ...reportBudgetItem,
        budgetItemId: 4,
        budgetItemName: 'Кофейные напитки',
      },
      {
        ...reportBudgetItem,
        budgetItemId: 5,
        parent: 4,
        budgetItemName: 'Кофе',
      },
    ],
  },
  type: 'ОДДС',
  year: 2022,
}

export const getAnalyticsPlanFactExpensesReportResponse: PlanFactExpensesReportGetDto =
  {
    createDate: '2022-11-21',
    data: {
      budgetItems: [
        reportBudgetItem,
        {
          ...reportBudgetItem,
          budgetItemId: 2,
          parent: 1,
          budgetItemName: 'Напитки',
        },
        {
          ...reportBudgetItem,
          budgetItemId: 3,
          parent: 2,
          budgetItemName: 'Сок',
        },
        {
          ...reportBudgetItem,
          budgetItemId: 4,
          budgetItemName: 'Кофейные напитки',
        },
        {
          ...reportBudgetItem,
          budgetItemId: 5,
          parent: 4,
          budgetItemName: 'Кофе',
        },
      ],
    },
    type: 'ProfitAndLoss',
    year: 2022,
  }
