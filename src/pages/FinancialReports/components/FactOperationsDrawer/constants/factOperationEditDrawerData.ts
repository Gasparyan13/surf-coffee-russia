import { EOperationsType } from '../../../../../common/types/Operations'

export const factOperationEditDrawerData: Record<
  string,
  {
    id: EOperationsType
  }
> = {
  Транзакция: {
    id: EOperationsType.Transaction,
  },
  'Кассовый ордер': {
    id: EOperationsType.CashOrders,
  },
  Чек: {
    id: EOperationsType.Receipt,
  },
  Акт: {
    id: EOperationsType.ServiceAct,
  },
  Накладная: {
    id: EOperationsType.Waybill,
  },
}
