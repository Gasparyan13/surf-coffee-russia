export enum EOperationsType {
  CashOrders = 'CASH_ORDER',
  PaymentInvoice = 'PAYMENT_INVOICE',
  ServiceAct = 'SERVICE_ACT',
  Transaction = 'TRANSACTION',
  Waybill = 'WAYBILL',
  Receipt = 'RECEIPT',
  PlannedOperation = 'PLANNED',
}

export type OperationsType = {
  id: EOperationsType
  title: string
  titleForCreateOperation: string
  titleForCell: string
}

export type MapOperationType = {
  [key: string]: OperationsType
}
