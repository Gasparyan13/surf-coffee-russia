import { Nullable } from '../../../../common/types/Nullable'
import { EOperationsType } from '../../../../common/types/Operations'

export type OperationDrawerState = {
  type: EOperationsType
  operationId?: number
  title: string
}

export type SliceState = {
  operationDrawer: Nullable<OperationDrawerState>
}
