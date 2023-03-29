import React from 'react'

import { EOperationsType } from '@common/types/Operations'

import { Operations } from '@constants'

import { render } from '@testEnv/utils'

import { TableCellOperationType } from './TableCellOperationType'
import { Props } from './TableCellOperationType.types'

jest.mock('./constants/iconByOperationType', () => ({
  iconByOperationType: {
    CASH_ORDER: () => 'CASH_ORDER_ICON',
    PAYMENT_INVOICE: () => 'PAYMENT_INVOICE_ICON',
    SERVICE_ACT: () => 'SERVICE_ACT_ICON',
    TRANSACTION: () => 'TRANSACTION_ICON',
    WAYBILL: () => 'WAYBILL_ICON',
    RECEIPT: () => 'RECEIPT_ICON',
    PLANNED: () => 'PLANNED_OPERATION_ICON',
  },
}))

describe('<TableCellOperationType />', () => {
  const renderTableCellOperationType = ({
    operationType = EOperationsType.CashOrders,
  }: Partial<Props>) =>
    render(
      <table>
        <tbody>
          <tr>
            <TableCellOperationType operationType={operationType} />
          </tr>
        </tbody>
      </table>,
    )

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('render "CashOrders" content', async () => {
    const { getByText } = renderTableCellOperationType({
      operationType: EOperationsType.CashOrders,
    })

    expect(getByText('CASH_ORDER_ICON')).toBeInTheDocument()
    expect(getByText(Operations.CASH_ORDER.titleForCell)).toBeInTheDocument()
  })

  test('render "PaymentInvoice" content', async () => {
    const { getByText } = renderTableCellOperationType({
      operationType: EOperationsType.PaymentInvoice,
    })

    expect(getByText('PAYMENT_INVOICE_ICON')).toBeInTheDocument()
    expect(
      getByText(Operations.PAYMENT_INVOICE.titleForCell),
    ).toBeInTheDocument()
  })

  test('render "PlannedOperation" content', async () => {
    const { getByText } = renderTableCellOperationType({
      operationType: EOperationsType.PlannedOperation,
    })

    expect(getByText('PLANNED_OPERATION_ICON')).toBeInTheDocument()
    expect(getByText(Operations.PLANNED.titleForCell)).toBeInTheDocument()
  })

  test('render "Receipt" content', async () => {
    const { getByText } = renderTableCellOperationType({
      operationType: EOperationsType.Receipt,
    })

    expect(getByText('RECEIPT_ICON')).toBeInTheDocument()
    expect(getByText(Operations.RECEIPT.titleForCell)).toBeInTheDocument()
  })

  test('render "ServiceAct" content', async () => {
    const { getByText } = renderTableCellOperationType({
      operationType: EOperationsType.ServiceAct,
    })

    expect(getByText('SERVICE_ACT_ICON')).toBeInTheDocument()
    expect(getByText(Operations.SERVICE_ACT.titleForCell)).toBeInTheDocument()
  })

  test('render "Transaction" content', async () => {
    const { getByText } = renderTableCellOperationType({
      operationType: EOperationsType.Transaction,
    })

    expect(getByText('TRANSACTION_ICON')).toBeInTheDocument()
    expect(getByText(Operations.TRANSACTION.titleForCell)).toBeInTheDocument()
  })

  test('render "Waybill" content', async () => {
    const { getByText } = renderTableCellOperationType({
      operationType: EOperationsType.Waybill,
    })

    expect(getByText('WAYBILL_ICON')).toBeInTheDocument()
    expect(getByText(Operations.WAYBILL.titleForCell)).toBeInTheDocument()
  })
})
