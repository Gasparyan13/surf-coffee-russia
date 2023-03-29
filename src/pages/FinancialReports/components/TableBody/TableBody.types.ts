import { SerializedStyles } from '@emotion/react'
import { TableProps } from 'fixed-data-table-2'

import {
  BudgetItemViewDto,
  PlanFactExpensesForMonthByBudgetItemGetDto,
  PlanFactTotalExpensesForYearByBudgetItemGetDto,
} from '@rtkApi/modules/__generated__/analytics'

export type DimensionsType = {
  width: number
  height: number
}

export type TableColumnType = 'MAIN' | 'SIDEBAR'
export type ColumnType = 'PLAN' | 'FACT' | 'PLAN-FACT' | 'CUSTOM'

export type ParsedBudgetItem = {
  budgetItemId: number
  budgetItemName: string
  hasChildren: boolean
  level: number
  months: {
    [key: string]: PlanFactExpensesForMonthByBudgetItemGetDto
  }
  negatedItems?: BudgetItemViewDto[]
  parent?: number
  total: PlanFactTotalExpensesForYearByBudgetItemGetDto
}

export type ParsedBalanceBudgetItem = {
  budgetItemId?: number
  sumMismatch?: boolean[]
  hasChildren?: boolean
  totalSum: number[]
} & Omit<
  ParsedBudgetItem,
  'months' | 'negatedItems' | 'total' | 'budgetItemId' | 'hasChildren'
>

export type Props = {
  rowsCount: number
  children?: TableProps['children']
  isLoading?: boolean
  scrollToColumn?: number
  rowHeight?: number
  headerHeight?: number
  maxWidth?: number
  showScrollbarX?: boolean
  getFooterHeight?: (tableHeight: number, rowHeight: number) => number
  rootOverwriteCSS?: SerializedStyles
  tableOverwriteCSS?: SerializedStyles
  onResize?: (height: number, width: number) => void
}
