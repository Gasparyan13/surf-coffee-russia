import { api } from '../__generated__/financial'

const enhancedRtkApi = api.enhanceEndpoints({
  endpoints: {
    postFinancialPlanAdjustments(endpoint) {
      endpoint.query = (queryArg) => ({
        url: `/financial/plan_adjustments`,
        method: 'POST',
        body: queryArg.planAdjustmentCreateDto,
        responseHandler: async (response) => response.toString(),
      })
    },
    patchFinancialDailySalariesMonthlyViewExcluded(endpoint) {
      endpoint.query = (queryArg) => ({
        url: `/financial/daily_salaries/monthlyView/excluded`,
        method: 'PATCH',
        body: queryArg.monthlySalaryExcludeDto,
        responseHandler: async (response) => response.toString(),
      })
    },
    deleteFinancialPlanAdjustments(endpoint) {
      endpoint.query = (queryArg) => ({
        url: `/financial/plan_adjustments`,
        method: 'DELETE',
        params: {
          enterpriseId: queryArg.enterpriseId,
          date: queryArg.date,
          budgetItemId: queryArg.budgetItemId,
        },
        responseHandler: async (response) => response.toString(),
      })
    },
  },
})

export const {
  usePostFinancialPlanAdjustmentsMutation,
  usePatchFinancialDailySalariesMonthlyViewExcludedMutation,
  useDeleteFinancialPlanAdjustmentsMutation,
} = enhancedRtkApi
