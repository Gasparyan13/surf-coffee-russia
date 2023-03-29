import { Operations } from '@constants'

import { operationDirection } from '../../../../OperationsTable/constants/operationDirection'
import { RequiredOperationGeneralView } from '../FiltersForm.types'

export const operationTypes = Object.values(Operations).map((operation) => ({
  text: operation.titleForCell,
  value: operation.id,
  key: operation.id,
}))

export const operationDirections = (
  Object.keys(
    operationDirection,
  ) as RequiredOperationGeneralView['operationKind'][]
).map((operation) => ({
  text: operationDirection[operation],
  value: operation,
  key: operation,
}))
