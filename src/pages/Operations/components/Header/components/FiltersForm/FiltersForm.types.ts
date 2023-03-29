import { Nullable } from '@common/types/Nullable'
import { EOperationsType } from '@common/types/Operations'

import { OperationGeneralView } from '@rtkApi/modules/__generated__/financial'
import {
  BudgetItemViewDto,
  ContractorDto,
} from '@rtkApi/modules/__generated__/prepayment'

import { CurrencyRangeValue } from '../CurrencyRangeInput/CurrencyRangeField.types'

export type RequiredOperationGeneralView = Required<OperationGeneralView>

export type Filters = {
  operationType: Nullable<`${EOperationsType}`>
  operationKind: Nullable<RequiredOperationGeneralView['operationKind']>
  contractor: Nullable<ContractorDto>
  article: Nullable<BudgetItemViewDto>
  amount: CurrencyRangeValue
}

export type Props = {
  initialValues?: Filters
  onComplete: (data: Filters) => Promise<void>
}
