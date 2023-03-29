import { FieldPath } from 'react-hook-form'

import * as T from '@pages/CreateOperations/components/forms/FormWaybill/FormWaybill.types'
import { ExpensesItemFieldKey } from '@pages/CreateOperations/components/forms/components/FormExpenses'
import { ExpensesValue } from '@pages/CreateOperations/components/forms/components/FormExpenses/FormExpenses.types'

export const getCleanedExpenses = (
  items: ExpensesValue[],
  isClearNameField: boolean,
  clearErrors: (
    name?: FieldPath<T.CreateWaybillForm> | FieldPath<T.CreateWaybillForm>[],
  ) => void,
) =>
  items?.map((item, i) => {
    if (isClearNameField)
      clearErrors(
        `expenses[${i}].${ExpensesItemFieldKey.NAME}` as FieldPath<T.CreateWaybillForm>,
      )

    return {
      ...item,
      [ExpensesItemFieldKey.NAME]: '',
      [ExpensesItemFieldKey.BUDGET_ITEM]: null,
    }
  })
