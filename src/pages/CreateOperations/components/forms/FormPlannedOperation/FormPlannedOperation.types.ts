import { Nullable } from '@common/types/Nullable'

import { BudgetItemDto } from '@rtkApi/modules/__generated__/financial'
import { ContractorDto } from '@rtkApi/modules/__generated__/prepayment'

import { BaseFormProps } from '../../../containers/Main/Main.types'
import { EWriteOffReceipt } from '../components/FormToggleButtonGroup/enums'
import { PaymentType } from './constants/enums'

export type CreateFormPlannedOperationForm = {
  isWriteOff: EWriteOffReceipt
  isService: boolean
  contractor: Nullable<ContractorDto>
  paymentDate: Nullable<Date>
  receiveDate: Nullable<Date>
  budgetItem: Nullable<BudgetItemDto>
  amount: Nullable<string>
  name: string
  paymentType: PaymentType | undefined
  // form value "expensesId" is used only for form edit mode to determine edited expense on BE
  expensesId?: number
}

export type Props = BaseFormProps
