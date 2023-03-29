import { uuid } from '@helpers/uuid'

import { EWriteOffReceipt } from '../../components/FormToggleButtonGroup/enums'
import * as T from '../FormCashWarrant.types'

export const defaultValues: T.CreateCashWarrantForm = {
  isWriteOff: EWriteOffReceipt.WriteOff,
  contractor: null,
  accountNumber: '',
  cashOrderNumber: '',
  cashOrderDate: null,
  paymentPurpose: '',
  expenses: [{ budgetItem: null, amount: undefined, name: '', id: uuid() }],
}
