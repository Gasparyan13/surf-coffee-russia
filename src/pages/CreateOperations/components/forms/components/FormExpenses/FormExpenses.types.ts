import {
  Control,
  FieldPath,
  FieldValues,
  UseFormClearErrors,
  UseFormTrigger,
} from 'react-hook-form'

import { Nullable } from '@common/types/Nullable'

import { AdditionalOperationType } from '@components/BudgetItemsAutocomplete/BudgetItemsAutocomplete.types'

import { BudgetItemDto } from '@rtkApi/modules/__generated__/financial'

import { ExpensesItemFieldKey } from './constants/enums'

export type ExpensesValue = {
  [ExpensesItemFieldKey.BUDGET_ITEM]: Nullable<BudgetItemDto>
  [ExpensesItemFieldKey.AMOUNT]?: string
  [ExpensesItemFieldKey.NAME]: string
  [ExpensesItemFieldKey.COMMISSIONING_DATE]?: Nullable<Date>
  [ExpensesItemFieldKey.PERIOD_OF_USE]?: string
  id?: string | number
  disabled?: boolean
  primeCost?: string
}

export type ItemsName = {
  [key in ExpensesItemFieldKey]?: { placeholder?: string; label?: string }
}

export type Props<T extends { [k: string]: FieldValues | ExpensesValue[] }> = {
  control: Control<T>
  trigger?: UseFormTrigger<T>
  clearErrors?: UseFormClearErrors<T>
  name: FieldPath<T>
  itemsNames?: ItemsName
  hasAdditionalFieldsCapitalAssets?: boolean
  hasPrimeCostInput?: boolean
  hasExcludedBudgetItems?: boolean
} & AdditionalOperationType

export type SelectedUsedCapitalAssests = string[] | null[]
