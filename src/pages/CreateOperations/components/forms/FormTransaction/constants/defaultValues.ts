import { uuid } from '@helpers/uuid'

import { EWriteOffReceipt } from '../../components/FormToggleButtonGroup/enums'
import * as T from '../FormTransaction.types'

export const defaultValues: T.CreateTransactionForm = {
  isWriteOff: EWriteOffReceipt.WriteOff,
  contractor: null,
  accountNumber: '',
  transactionNumber: '',
  transactionDate: null,
  paymentPurpose: '',
  expenses: [
    {
      budgetItem: null,
      amount: undefined,
      name: '',
      id: uuid(),
    },
  ],
}
