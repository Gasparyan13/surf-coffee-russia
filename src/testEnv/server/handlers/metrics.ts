import { rest } from 'msw'

import { ForecastMetricDto } from '@rtkApi/modules/__generated__/metric'

import { successGetMetricsForecast } from '@testEnv/mocks/api/metrics'

export const mockApiGetMetricForecast = (
  data: ForecastMetricDto = successGetMetricsForecast,
  status = 200,
) =>
  rest.get(/metric\/forecast/, async (req, res, ctx) => {
    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })
