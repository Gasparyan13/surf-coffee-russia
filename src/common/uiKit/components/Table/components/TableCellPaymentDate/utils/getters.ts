import { EOperationsType } from '@common/types/Operations'

export const getPaymentDateTooltipText = (
  operationType?: `${EOperationsType}`,
): string => {
  switch (operationType) {
    case EOperationsType.Transaction:
    case EOperationsType.CashOrders:
    case EOperationsType.PlannedOperation:
      return 'Дата оплаты'
    case EOperationsType.Receipt:
      return 'Дата документа'

    default:
      return 'Дата поставки'
  }
}
