import { ExpenseItemValue } from '../../FormExpenseItem/FormExpenseItem.types'
import { ExpensesValue } from '../FormExpenses.types'
import { ExpensesItemFieldKey } from '../constants/enums'

export const getTotalSum = (items?: ExpensesValue[]) =>
  items?.reduce((acc: number, item: ExpensesValue) => {
    const sumValue = item[ExpensesItemFieldKey.AMOUNT]

    return acc + (sumValue ? +sumValue.replaceAll(' ', '') : 0)
  }, 0) ?? 0

export const getTypeValue = (currentValue: ExpenseItemValue) => {
  const isObject = currentValue !== null && typeof currentValue === 'object'
  const hasTarget = isObject && 'target' in currentValue && currentValue.target

  if (hasTarget && 'value' in currentValue.target)
    return currentValue.target.value ?? ''

  return currentValue
}
