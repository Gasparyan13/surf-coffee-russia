import { EOperationsType, MapOperationType } from '../types/Operations'

export const Operations: MapOperationType = {
  [EOperationsType.PlannedOperation]: {
    id: EOperationsType.PlannedOperation,
    title: 'Плановая операция',
    titleForCreateOperation: 'Добавить плановую операцию',
    titleForCell: 'План',
  },
  [EOperationsType.PaymentInvoice]: {
    id: EOperationsType.PaymentInvoice,
    title: 'Счёт на оплату',
    titleForCreateOperation: 'Добавить счёт',
    titleForCell: 'Счёт',
  },
  [EOperationsType.Transaction]: {
    id: EOperationsType.Transaction,
    title: 'Транзакция',
    titleForCreateOperation: 'Добавить транзакцию',
    titleForCell: 'Транзакция',
  },
  [EOperationsType.CashOrders]: {
    id: EOperationsType.CashOrders,
    title: 'Кассовый ордер',
    titleForCreateOperation: 'Добавить кассовый ордер',
    titleForCell: 'Кассовый ордер',
  },
  [EOperationsType.ServiceAct]: {
    id: EOperationsType.ServiceAct,
    title: 'Акт',
    titleForCreateOperation: 'Добавить акт',
    titleForCell: 'Акт',
  },
  [EOperationsType.Waybill]: {
    id: EOperationsType.Waybill,
    title: 'Накладная',
    titleForCreateOperation: 'Добавить накладную',
    titleForCell: 'Накладная',
  },
  [EOperationsType.Receipt]: {
    id: EOperationsType.Receipt,
    title: 'Чек',
    titleForCreateOperation: 'Добавить чек',
    titleForCell: 'Чек',
  },
}
