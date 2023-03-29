import { ContractorDto } from '@rtkApi/modules/__generated__/prepayment'

import { BaseFormProps } from '../../../containers/Main/Main.types'
import { ExpensesValue } from '../components/FormExpenses/FormExpenses.types'
import { EWriteOffReceipt } from '../components/FormToggleButtonGroup/enums'

export type CreateTransactionForm = {
  isWriteOff: EWriteOffReceipt
  contractor: ContractorDto | null
  accountNumber: string
  transactionNumber: string
  transactionDate: null | Date
  paymentPurpose: string
  expenses: ExpensesValue[]
}

export type Props = BaseFormProps
