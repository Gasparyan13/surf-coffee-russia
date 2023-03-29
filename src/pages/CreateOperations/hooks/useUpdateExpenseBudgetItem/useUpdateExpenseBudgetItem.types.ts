import { FieldValues, UseFormSetValue } from 'react-hook-form'

import { ExpensesValue } from '../../components/forms/components/FormExpenses/FormExpenses.types'
import { Props as FormToggleButtonProps } from '../../components/forms/components/FormToggleButtonGroup/FormToggleButtonGroup.types'

export type Props<T extends { [k: string]: FieldValues }> = {
  expenses: ExpensesValue[]
  setValue: UseFormSetValue<T>
  isClearBudgetItem?: boolean
}

export type HookReturn<T extends { [k: string]: FieldValues }> = {
  handleTabChange: FormToggleButtonProps<T>['onChange']
}
