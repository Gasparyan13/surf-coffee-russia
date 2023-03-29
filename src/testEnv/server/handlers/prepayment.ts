import { rest } from 'msw'

import {
  GetPrepaymentBudgetItemsApiResponse,
  GetPrepaymentContractorsApiResponse,
} from '@rtkApi/modules/__generated__/prepayment'

export const mockGetPrepaymentBudgetItemsResponse = (
  data: GetPrepaymentBudgetItemsApiResponse,
  status = 200,
) =>
  rest.get(/prepayment\/budget_items/, async (req, res, ctx) => {
    if (typeof data === 'string') {
      return res(ctx.delay(0), ctx.status(status), ctx.text(data))
    }

    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })

export const mockGetPrepaymentContractorsResponse = (
  data: GetPrepaymentContractorsApiResponse,
  status = 200,
) =>
  rest.get(/prepayment\/contractors/, async (req, res, ctx) => {
    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })
