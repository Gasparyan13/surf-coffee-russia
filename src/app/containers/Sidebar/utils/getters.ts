import { MapOperationType, OperationsType } from '@common/types/Operations'

export const getListRowOperations = (
  operationsType: MapOperationType,
): OperationsType[] => Object.values(operationsType)
