import { BudgetItemViewDto } from '@rtkApi/modules/__generated__/prepayment'

const CAPITAL_ASSETS: BudgetItemViewDto = {
  id: 115,
  name: 'Приход ОС по договору лизинга',
  parentItemId: 109,
  isExpense: true,
  isExternal: false,
  isCapitalAssets: true,
}

const ASSETS: BudgetItemViewDto = {
  id: 41,
  name: 'НДФЛ',
  parentItemId: 28,
  isExpense: true,
  isExternal: false,
  isCapitalAssets: false,
}

const MANAGER: BudgetItemViewDto = {
  id: 43,
  name: 'Управляющий',
  parentItemId: 40,
  isExpense: true,
  isExternal: false,
  isCapitalAssets: false,
}

export const articlesMock: { [key: number]: BudgetItemViewDto } = {
  115: CAPITAL_ASSETS,
  41: ASSETS,
  43: MANAGER,
}
