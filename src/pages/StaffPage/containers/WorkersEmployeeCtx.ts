import React from 'react'

import { createCtx } from '@helpers/createCtx'

export type WorkerEmployeeCtxType = {
  employeeId?: number
  setEmployeeId: React.Dispatch<React.SetStateAction<number | undefined>>
  isFetchingTable?: boolean
}

export const [useWorkerEmployeeIdCtx, WorkerEmployeeProvider] =
  createCtx<WorkerEmployeeCtxType>()
