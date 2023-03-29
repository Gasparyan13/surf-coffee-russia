import { rest } from 'msw'

import { EnterpriseWorkerViewDto } from '@rtkApi/modules/__generated__/enterprise'

import { successGetEnterpriseWorkers } from '@testEnv/mocks/api/enterprise'

export const mockApiGetEnterpriseWorkers = (
  data: EnterpriseWorkerViewDto[] = successGetEnterpriseWorkers,
  status = 200,
) =>
  rest.get(/enterprise\/workers/, async (req, res, ctx) => {
    return res(ctx.delay(0), ctx.status(status), ctx.json(data))
  })
