import { RootState } from '../../../../store/rootConfig'
import { SliceState } from './types'

export const getOperationDrawerState = (
  state: RootState,
): SliceState['operationDrawer'] => state.createOperation.operationDrawer
