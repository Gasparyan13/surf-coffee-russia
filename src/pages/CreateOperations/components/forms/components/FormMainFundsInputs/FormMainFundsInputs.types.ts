import { FieldError } from 'react-hook-form'

import { ExpenseItemValue } from '../FormExpenseItem/FormExpenseItem.types'
import { ExpensesItemFieldKey } from '../FormExpenses'

export type Props = {
  index: number
  periodOfUseValue: string
  dateValue: Date
  getLabelPlaceholder: (field: ExpensesItemFieldKey) => {
    label: string | undefined
    placeholder: string | undefined
  }
  error: FieldError | undefined
  getError: (
    index: number,
    key: string,
    itemError?: FieldError,
  ) => FieldError | undefined
  onChange: (key: string, index: number) => (value: ExpenseItemValue) => void
  disabled?: boolean
}
