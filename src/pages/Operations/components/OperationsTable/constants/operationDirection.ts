import { OperationRow } from '../OperationsTable.types'

type RequiredOperationRow = Required<OperationRow>

export const operationDirection: Record<
  RequiredOperationRow['operationKind'],
  string
> = {
  PURCHASE: 'Покупка',
  SALE: 'Продажа',
  WRITE_OFF: 'Списание',
  INCOME: 'Поступление',
}
