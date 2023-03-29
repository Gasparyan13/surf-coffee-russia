import React from 'react'

import { EOperationsType } from '@common/types/Operations'

import { fireEvent, render, waitFor } from '@testEnv/utils'

import { TableCellPaymentDate } from './TableCellPaymentDate'
import { Props } from './TableCellPaymentDate.types'

const PAYMENT_DATE = '2022-12-02'
const FORMATTED_PAYMENT_DATE = '02-12-2022'
const RECEIVED_DATE = '2022-12-11'
const FORMATTED_RECEIVED_DATE = '11-12-2022'

describe('<TableCellPaymentDate />', () => {
  const renderTableCellPaymentDate = ({
    paymentDate = PAYMENT_DATE,
    receivedDate,
    operationType,
  }: Partial<Props>) =>
    render(
      <table>
        <tbody>
          <tr>
            <TableCellPaymentDate
              operationType={operationType}
              paymentDate={paymentDate}
              receivedDate={receivedDate}
            />
          </tr>
        </tbody>
      </table>,
    )

  it('should render "paymentDate" only', async () => {
    const { getByRole, getByText } = renderTableCellPaymentDate({})

    const table = getByRole('table')
    const cellContent = table.querySelector('tbody > tr > td')!.childNodes[0]

    expect(cellContent.childNodes.length).toEqual(1)
    expect(getByText(FORMATTED_PAYMENT_DATE)).toBeInTheDocument()
  })

  it('should render "paymentDate" and "receivedDate"', async () => {
    const { getByText } = renderTableCellPaymentDate({
      paymentDate: PAYMENT_DATE,
      receivedDate: RECEIVED_DATE,
    })

    expect(getByText(FORMATTED_PAYMENT_DATE)).toBeInTheDocument()
    expect(getByText(FORMATTED_RECEIVED_DATE)).toBeInTheDocument()
  })

  describe('when hover', () => {
    it('should render default "Дата поставки" tooltip message if "operationType" is undefined', async () => {
      const { getByText } = renderTableCellPaymentDate({
        operationType: undefined,
      })

      fireEvent.mouseEnter(getByText(FORMATTED_PAYMENT_DATE))

      await waitFor(() => {
        expect(getByText('Дата поставки')).toBeInTheDocument()
      })
    })

    it('should render "Дата поставки" tooltip message if "operationType" is "PaymentInvoice"', async () => {
      const { getByText } = renderTableCellPaymentDate({
        operationType: EOperationsType.PaymentInvoice,
      })

      fireEvent.mouseEnter(getByText(FORMATTED_PAYMENT_DATE))

      await waitFor(() => {
        expect(getByText('Дата поставки')).toBeInTheDocument()
      })
    })

    it('should render "Дата поставки" tooltip message if "operationType" is "ServiceAct"', async () => {
      const { getByText } = renderTableCellPaymentDate({
        operationType: EOperationsType.ServiceAct,
      })

      fireEvent.mouseEnter(getByText(FORMATTED_PAYMENT_DATE))

      await waitFor(() => {
        expect(getByText('Дата поставки')).toBeInTheDocument()
      })
    })

    it('should render "Дата поставки" tooltip message if "operationType" is "Waybill"', async () => {
      const { getByText } = renderTableCellPaymentDate({
        operationType: EOperationsType.Waybill,
      })

      fireEvent.mouseEnter(getByText(FORMATTED_PAYMENT_DATE))

      await waitFor(() => {
        expect(getByText('Дата поставки')).toBeInTheDocument()
      })
    })

    it('should render "Дата оплаты" tooltip message if "operationType" is "Transaction"', async () => {
      const { getByText } = renderTableCellPaymentDate({
        operationType: EOperationsType.Transaction,
      })

      fireEvent.mouseEnter(getByText(FORMATTED_PAYMENT_DATE))

      await waitFor(() => {
        expect(getByText('Дата оплаты')).toBeInTheDocument()
      })
    })

    it('should render "Дата оплаты" tooltip message if "operationType" is "CashOrders"', async () => {
      const { getByText } = renderTableCellPaymentDate({
        operationType: EOperationsType.CashOrders,
      })

      fireEvent.mouseEnter(getByText(FORMATTED_PAYMENT_DATE))

      await waitFor(() => {
        expect(getByText('Дата оплаты')).toBeInTheDocument()
      })
    })

    it('should render "Дата документа" tooltip message if "operationType" is "Receipt"', async () => {
      const { getByText } = renderTableCellPaymentDate({
        operationType: EOperationsType.Receipt,
      })

      fireEvent.mouseEnter(getByText(FORMATTED_PAYMENT_DATE))

      await waitFor(() => {
        expect(getByText('Дата документа')).toBeInTheDocument()
      })
    })

    it('should render "receivedDate" tooltip message', async () => {
      const { getByText, getAllByText } = renderTableCellPaymentDate({
        paymentDate: PAYMENT_DATE,
        receivedDate: RECEIVED_DATE,
        operationType: EOperationsType.PlannedOperation,
      })

      fireEvent.mouseEnter(getByText(FORMATTED_RECEIVED_DATE))

      await waitFor(() => {
        expect(getByText('Дата оплаты:')).toBeInTheDocument()
      })
      expect(getAllByText(FORMATTED_PAYMENT_DATE).length).toEqual(2)
      expect(getByText('Дата начисления:')).toBeInTheDocument()
      expect(getAllByText(FORMATTED_RECEIVED_DATE).length).toEqual(2)
    })
  })
})
