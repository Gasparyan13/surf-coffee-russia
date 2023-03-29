import { uuid } from '@helpers'

import { EWriteOffReceipt } from '../../components/FormToggleButtonGroup/enums'
import { CreatePaymentInvoiceForm } from '../FormPaymentInvoice.types'

export const defaultValues: CreatePaymentInvoiceForm = {
  isWriteOff: EWriteOffReceipt.WriteOff,
  contractor: null,
  expenses: [
    {
      budgetItem: null,
      amount: undefined,
      name: '',
      id: uuid(),
      primeCost: undefined,
    },
  ],
  invoiceNumber: '',
  invoiceDate: null,
  paymentDate: null,
  document: null,
}
