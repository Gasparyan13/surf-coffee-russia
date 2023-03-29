import { ExcludedBudgetItems } from '@components/BudgetItemsAutocomplete/BudgetItemsAutocomplete.types'

// статьи ФОТ(Вознаграждение команды)
export const idPayrollBudgetItems: { [key: number]: boolean } = {
  43: true,
  44: true,
  40: true,
}

export const idExcludedBudgetItems: ExcludedBudgetItems = Object.keys(
  idPayrollBudgetItems,
).map((item) => Number(item))
