import { Nullable } from '@common/types/Nullable'

import {
  DocumentViewDto,
  OperationViewDto,
} from '@rtkApi/modules/__generated__/financial'
import { ContractorDto } from '@rtkApi/modules/__generated__/prepayment'

import { ExpensesValue } from '../../components/forms/components/FormExpenses/FormExpenses.types'
import {
  EPurchaseSale,
  EWriteOffReceipt,
} from '../../components/forms/components/FormToggleButtonGroup/enums'

export type OperationFormData = Required<
  {
    isPurchase: EPurchaseSale
    isWriteOff: EWriteOffReceipt
    contractor: ContractorDto
    expenses: ExpensesValue[]
    operationDate: Nullable<Date>
    receiveDate: Nullable<Date>
    document: Nullable<File>
  } & Omit<
    OperationViewDto,
    | 'id'
    | 'enterpriseId'
    | 'contractorId'
    | 'expenses'
    | 'operationDate'
    | 'receiveDate'
    | 'document'
    | 'isIncome'
  >
>

export type UseEditOperationFormDataParams = {
  editOperationId?: number
  onFormDataLoadComplete: (
    formData: OperationFormData,
    documentInfo?: DocumentViewDto,
  ) => void
  onDisabled: (disabled: boolean) => void
}
