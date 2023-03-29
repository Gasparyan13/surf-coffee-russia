import { Nullable } from '@common/types/Nullable'

import { ContractorDto } from '@rtkApi/modules/__generated__/prepayment'

import { BaseFormProps } from '../../../containers/Main/Main.types'
import { ExpensesValue } from '../components/FormExpenses/FormExpenses.types'

export type CreatePaymentReceiptForm = {
  contractor: Nullable<ContractorDto>
  expenses: ExpensesValue[]
  documentDate: Nullable<Date>
  document: Nullable<File>
}

export type Props = BaseFormProps
