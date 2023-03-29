import { FilterOptionsState } from '@mui/base'

import { BudgetItemDto } from '@rtkApi/modules/__generated__/financial'
import { BudgetItemViewDto } from '@rtkApi/modules/__generated__/prepayment'

import { BudgetItemsMap, SelectedId } from '../../BudgetItemsAutocomplete.types'

export type Props = {
  level: number
  name: string
  id: number
  optionIds: number[]
  budgetItemsMap: BudgetItemsMap
  selectedId: SelectedId
  searchValue: FilterOptionsState<BudgetItemViewDto>['inputValue']
  isSelectedBudgetItem: boolean
  isStartMatches: boolean
  onClick: (value: BudgetItemDto) => void
} & Omit<React.HTMLAttributes<HTMLLIElement>, 'id' | 'onClick'>
