import { FIXED_ASSETS } from '@pages/CreateOperations/components/forms/components/FormExpenseItem/constants/constants'

import {
  GetPrepaymentBudgetItemsApiResponse,
  GetPrepaymentContractorsApiResponse,
} from '@rtkApi/modules/__generated__/prepayment'

export const successGetPrepaymentBudgetItemsEmptyArray: GetPrepaymentBudgetItemsApiResponse =
  []

export const successGetPrepaymentBudgetItems: GetPrepaymentBudgetItemsApiResponse =
  [
    {
      id: 27,
      name: 'КОСВЕННЫЕ ЗАТРАТЫ',
      rootId: 27,
      level: 0,
      children: [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
      isExpense: true,
      isExternal: false,
      isCapitalAssets: false,
    },
    {
      id: 28,
      name: 'Фонд оплаты труда',
      rootId: 27,
      level: 1,
      parentItemId: 27,
      children: [40, 41, 42],
      isExpense: true,
      isExternal: false,
      isCapitalAssets: false,
    },
    {
      id: 40,
      name: 'Вознаграждение команды',
      rootId: 27,
      level: 2,
      parentItemId: 28,
      children: [43, 44],
      isExpense: true,
      isExternal: false,
      isCapitalAssets: false,
    },
    {
      id: 43,
      name: 'Управляющий',
      rootId: 27,
      level: 3,
      parentItemId: 40,
      children: [],
      isExpense: true,
      isExternal: false,
      isCapitalAssets: false,
    },
    {
      id: 44,
      name: 'Бариста',
      rootId: 27,
      level: 3,
      parentItemId: 40,
      children: [],
      isExpense: true,
      isExternal: false,
      isCapitalAssets: false,
    },
    {
      id: 109,
      name: 'Основные средства',
      rootId: 109,
      level: 0,
      children: [110, 111, 112, 113, 114, 115, 116],
      isExpense: true,
      isExternal: false,
      isCapitalAssets: true,
    },
    {
      id: 110,
      name: 'Приход ОС по договору купли-продажи',
      rootId: 109,
      level: 1,
      parentItemId: 109,
      children: [],
      isExpense: true,
      isExternal: false,
      isCapitalAssets: true,
    },
    {
      id: FIXED_ASSETS,
      name: 'Приход ОС по договору лизинга',
      rootId: 109,
      level: 1,
      parentItemId: 109,
      children: [],
      isExpense: true,
      isExternal: false,
      isCapitalAssets: true,
    },
  ]

export const capitalAssetsBudgetItem = {
  id: FIXED_ASSETS,
  name: 'Приход ОС по договору лизинга',
  rootId: 109,
  level: 1,
  parentItemId: 109,
  children: [],
  isExpense: true,
  isExternal: false,
  isCapitalAssets: true,
}

export const payrollBudgetItem = {
  id: 43,
  name: 'Управляющий',
  rootId: 27,
  level: 3,
  parentItemId: 40,
  children: [],
  isExpense: true,
  isExternal: false,
  isCapitalAssets: false,
}

export const successGetPrepaymentContractorWorkers: GetPrepaymentContractorsApiResponse =
  [
    {
      id: 538,
      alias: 'Господин Управляющий',
    },
    {
      id: 539,
      alias: 'Вадим Галыгин',
    },
  ]
