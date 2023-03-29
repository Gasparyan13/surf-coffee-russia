import { Nullable } from '@common/types/Nullable'

import {
  AdditionalOperationType,
  ExcludedBudgetItems,
} from '@components/BudgetItemsAutocomplete/BudgetItemsAutocomplete.types'

import { BudgetItemViewDto } from '@rtkApi/modules/__generated__/prepayment'

export type Props = {
  label?: string
  placeholder?: string
  value: Nullable<BudgetItemViewDto>
  onChange: (value: Nullable<BudgetItemViewDto>) => void
  error?: string
  disabled?: boolean
  excludedBudgetItems?: Nullable<ExcludedBudgetItems>
} & AdditionalOperationType
