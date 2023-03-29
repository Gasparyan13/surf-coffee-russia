import { api } from '../__generated__/analytics'

const enhancedRtkApi = api.enhanceEndpoints({
  endpoints: {
    postAnalyticsBalanceSheetActionsClosePeriod(endpoint) {
      endpoint.query = (queryArg) => ({
        url: `/analytics/balance_sheet/actions/close_period`,
        method: 'POST',
        body: queryArg.closePeriodActionDto,
        responseHandler: async (response) => response.toString(),
      })
    },
  },
})

export const { usePostAnalyticsBalanceSheetActionsClosePeriodMutation } =
  enhancedRtkApi
