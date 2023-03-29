import { rest } from 'msw'

import { SUCCESS_MESSAGE_CLOSE_PERIOD } from '@pages/FinancialReports/components/FinReportHeader/constants/messages/success'

import {
  getAnalyticsBalanceSheetByEnterpriseIdApiResponse,
  getAnalyticsCashFlowReportResponse,
  getAnalyticsPlanFactExpensesReportResponse,
} from '../../mocks/api/analytics'

export const mockGetAnalyticsBalanceSheetByEnterpriseId = (
  data = getAnalyticsBalanceSheetByEnterpriseIdApiResponse,
) =>
  rest.get(/analytics\/balance_sheet\/\d+/, async (req, res, ctx) => {
    return res(ctx.delay(0), ctx.json(data))
  })

export const mockPostAnalyticsBalanceSheetActionsClosePeriod = (
  message = SUCCESS_MESSAGE_CLOSE_PERIOD,
  status = 200,
) =>
  rest.post(
    /analytics\/balance_sheet\/actions\/close_period/,
    async (req, res, ctx) => {
      return res(ctx.delay(0), ctx.status(status), ctx.text(message))
    },
  )

export const mockGetAnalyticsCashFlowReport = (
  data = getAnalyticsCashFlowReportResponse,
) =>
  rest.get(/analytics\/cash_flow_report/, async (req, res, ctx) => {
    return res(ctx.delay(0), ctx.json(data))
  })

export const mockGetAnalyticsPlanFactExpensesReport = (
  data = getAnalyticsPlanFactExpensesReportResponse,
) =>
  rest.get(/analytics\/plan_fact_expenses_report/, async (req, res, ctx) => {
    return res(ctx.delay(0), ctx.json(data))
  })
