import { WorkerEmployeeCtxType } from '@pages/StaffPage/containers/WorkersEmployeeCtx'

export type ConfigWorkerEmployeeCtxValueParams = Partial<WorkerEmployeeCtxType>

export const configWorkerEmployeeCtxValue = ({
  employeeId,
  setEmployeeId = () => {},
}: ConfigWorkerEmployeeCtxValueParams): WorkerEmployeeCtxType => ({
  employeeId,
  setEmployeeId,
})
