import { Nullable } from '@common/types/Nullable'

import { ContractorDto } from '@rtkApi/modules/__generated__/prepayment'

import { BaseFormProps } from '../../../containers/Main/Main.types'
import { ExpensesValue } from '../components/FormExpenses/FormExpenses.types'
import { EPurchaseSale } from '../components/FormToggleButtonGroup/enums'

export type CreateWaybillForm = {
  isPurchase: EPurchaseSale
  contractor: Nullable<ContractorDto>
  expenses: ExpensesValue[]
  waybillNumber: string
  waybillDate: Nullable<Date>
  deliveryDate: Nullable<Date>
  document: Nullable<File>
  primeCost?: string
}

export type Props = BaseFormProps
