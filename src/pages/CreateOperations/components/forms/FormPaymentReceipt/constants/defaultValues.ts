import { uuid } from '@helpers/uuid'

import { CreatePaymentReceiptForm } from '../FormPaymentReceipt.types'

export const defaultValues: CreatePaymentReceiptForm = {
  contractor: null,
  expenses: [
    {
      budgetItem: null,
      amount: undefined,
      name: '',
      id: uuid(),
    },
  ],
  documentDate: null,
  document: null,
}
