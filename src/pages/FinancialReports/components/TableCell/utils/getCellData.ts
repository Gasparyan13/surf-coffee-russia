import {
  CashFlowReportForYearByBudgetItemViewDto,
  PlanFactExpensesForYearByBudgetItemGetDto,
} from '@rtkApi/modules/__generated__/analytics'

import { TableCellProps } from '../TableCell.types'
import {
  TEST_ID_MONTH_DATA_FACT,
  TEST_ID_MONTH_DATA_PLAN,
} from '../components/Cell/constants/testIds'

export type GetCellDataParams = {
  currentEngMonth: string
  item:
    | (PlanFactExpensesForYearByBudgetItemGetDto &
        CashFlowReportForYearByBudgetItemViewDto)
    | undefined
}

export const getCellData = ({ currentEngMonth, item }: GetCellDataParams) => {
  const currentMonthData = item?.months?.[currentEngMonth]
  const planAmount = currentMonthData?.plan
  const factAmount = currentMonthData?.fact
  const planIsActive = currentMonthData?.isActivePlanCell
  const factIsActive = currentMonthData?.isActiveFactCell

  let leftCellTooltip
  let rightCellTooltip

  const leftCell: TableCellProps = {
    id: item?.budgetItemId as number,
    text: planAmount ? String(planAmount) : undefined,
    type: 'TITLE',
    isNumber: !!planAmount,
    tooltipTitle: leftCellTooltip,
    isEditable: planIsActive,
    testId: `${TEST_ID_MONTH_DATA_PLAN}-${item?.budgetItemId}-${currentEngMonth}`,
  }

  const rightCell: TableCellProps = {
    id: item?.budgetItemId as number,
    text: factAmount ? String(factAmount) : undefined,
    type: 'TITLE',
    isNumber: !!factAmount,
    tooltipTitle: rightCellTooltip,
    isEditable: factIsActive,
    testId: `${TEST_ID_MONTH_DATA_FACT}-${item?.budgetItemId}-${currentEngMonth}`,
  }

  return { leftCell, rightCell }
}
