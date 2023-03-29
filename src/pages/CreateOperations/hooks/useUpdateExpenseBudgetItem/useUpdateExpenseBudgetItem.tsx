import { useCallback } from 'react'
import { FieldValues, Path, PathValue } from 'react-hook-form'

import { FormFieldKey } from '../../components/forms/FormAct/constants/enums'
import { ExpensesItemFieldKey } from '../../components/forms/components/FormExpenses'
import * as T from './useUpdateExpenseBudgetItem.types'

export const useUpdateExpenseBudgetItem = <C extends FieldValues>({
  setValue,
  expenses,
  isClearBudgetItem = true,
}: T.Props<C>): T.HookReturn<C> => {
  const handleTabChange = useCallback(
    (
      _: React.SyntheticEvent,
      newValue: string,
      callBack: (arg: string) => void,
    ) => {
      if (isClearBudgetItem) {
        const newExpenses = expenses.map((expense) => {
          return {
            ...expense,
            [ExpensesItemFieldKey.BUDGET_ITEM]: null,
          }
        })

        setValue(
          FormFieldKey.EXPENSES as Path<C>,
          newExpenses as PathValue<C, Path<C>>,
        )
      }

      callBack(newValue)
    },
    [expenses, setValue, isClearBudgetItem],
  )

  return { handleTabChange }
}
