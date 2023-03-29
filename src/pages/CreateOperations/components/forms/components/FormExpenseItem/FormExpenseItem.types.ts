import React from 'react'
import {
  FieldError,
  FieldPathValue,
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormTrigger,
} from 'react-hook-form'

import { Nullable } from '@common/types/Nullable'

import {
  AdditionalOperationType,
  ExcludedBudgetItems,
} from '@components/BudgetItemsAutocomplete/BudgetItemsAutocomplete.types'

import { AutocompleteItem } from '@uiKit/components/Autocomplete/Autocomplete.types'

import { BudgetItemDto } from '@rtkApi/modules/__generated__/financial'

import { ExpensesItemFieldKey } from '../FormExpenses'
import {
  ExpensesValue,
  SelectedUsedCapitalAssests,
} from '../FormExpenses/FormExpenses.types'

export type ExpenseProps<
  T extends { [k: string]: FieldValues | ExpensesValue[] },
  K extends Path<T>,
> = {
  items: FieldPathValue<T, K>
  index: number
  error: FieldError | undefined
  hasAdditionalFieldsCapitalAssets?: boolean
  handleChangeItem: (
    key: string,
    index: number,
  ) => (value: ExpenseItemValue) => void
  itemsNames?: {
    [key in ExpensesItemFieldKey]?: { placeholder?: string; label?: string }
  }
  getError: (
    index: number,
    key: string,
    itemError?: FieldError,
  ) => FieldError | undefined
  options?: AutocompleteItem[]
  selectedOptions?: SelectedUsedCapitalAssests
  trigger?: UseFormTrigger<T>
  clearErrors?: UseFormClearErrors<T>
  hasPrimeCostInput?: boolean
  excludedBudgetItems: Nullable<ExcludedBudgetItems>
} & AdditionalOperationType

export type ExpenseItemValue =
  | string
  | null
  | number
  | React.ChangeEvent<HTMLInputElement>
  | React.SyntheticEvent<Element, Event>
  | Date
  | BudgetItemDto
  | AutocompleteItem[]
  | undefined
