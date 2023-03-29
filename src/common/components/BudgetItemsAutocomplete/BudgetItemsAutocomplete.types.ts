import { Nullable } from '@common/types/Nullable'

import {
  BudgetItemViewDto,
  GetPrepaymentBudgetItemsApiArg,
} from '@rtkApi/modules/__generated__/prepayment'

export type AdditionalOperationType = Partial<GetPrepaymentBudgetItemsApiArg>

export type ExcludedBudgetItems = number[]

export type Props = {
  onChange: (value: Nullable<BudgetItemViewDto>) => void
  value: Nullable<BudgetItemViewDto>
  error?: string
  placeholder?: string
  disabled?: boolean
  label?: string
  excludedBudgetItems?: Nullable<ExcludedBudgetItems>
} & AdditionalOperationType

type BudgetItem = BudgetItemViewDto & {
  isVisible: boolean
}

export type BudgetItemsMap = {
  [key: number]: BudgetItem
}

export type SelectedId = Nullable<number>
