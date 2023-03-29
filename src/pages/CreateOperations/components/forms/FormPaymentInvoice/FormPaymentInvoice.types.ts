import { Nullable } from '@common/types/Nullable'

import { ContractorDto } from '@rtkApi/modules/__generated__/prepayment'

import { BaseFormProps } from '../../../containers/Main/Main.types'
import { ExpensesValue } from '../components/FormExpenses/FormExpenses.types'
import { EWriteOffReceipt } from '../components/FormToggleButtonGroup/enums'

export type CreatePaymentInvoiceForm = {
  isWriteOff: EWriteOffReceipt
  contractor: Nullable<ContractorDto>
  expenses: ExpensesValue[]
  invoiceNumber: string
  invoiceDate: Nullable<Date>
  paymentDate: Nullable<Date>
  document: Nullable<File>
}

export type Props = BaseFormProps
