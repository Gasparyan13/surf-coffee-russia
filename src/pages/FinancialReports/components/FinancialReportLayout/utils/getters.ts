import { DEFAULT_SERVER_DATE_FORMAT, MONTHS_RU } from '@constants'

import { DateHelper } from '@helpers'

import { SharedFinancialReportDto } from '../../../hooks/useSharedFinancialReportData'
import { ParsedBudgetItem } from '../../TableBody/TableBody.types'
import { GetFormattedFirstDayOfMonthArg } from '../FinancialReportLayout.types'

export const getParent: (
  id: number,
  budgetItems: SharedFinancialReportDto,
) => number | undefined = (id, budgetItems) => {
  const foundItem = budgetItems?.find((item) => item.budgetItemId === id)
  if (foundItem?.parent) return getParent(foundItem?.parent, budgetItems)
  return foundItem?.budgetItemId
}

export const getTotalNewBudgetItems = (
  budgetItems: SharedFinancialReportDto,
  newBudgetItems: SharedFinancialReportDto,
) => {
  return budgetItems?.map((item) => {
    const updatedExpense = newBudgetItems?.find(
      (el) => el.budgetItemId === item.budgetItemId,
    )
    if (updatedExpense) return updatedExpense
    return item
  })
}

export const getChildItems = (
  parentId: number | undefined,
  level: number,
  budgetItems?: SharedFinancialReportDto,
): ParsedBudgetItem[] => {
  const childrenBudgetItems = budgetItems?.filter(
    (item) => item.parent === parentId,
  )

  return (childrenBudgetItems as unknown as ParsedBudgetItem[]).reduce<
    ParsedBudgetItem[]
  >((acc, item) => {
    const children = getChildItems(item.budgetItemId, level + 1, budgetItems)

    return [
      ...acc,
      { ...item, level, hasChildren: Boolean(children.length) },
      ...children.flat(),
    ]
  }, [])
}

export const getOriginalBudgetItemsFirstLayer = (
  budgetItems?: SharedFinancialReportDto,
) => budgetItems?.filter((el) => !el.parent)

// Сортировка элементов в порядке раскрытого иерархического дерева
export const getOriginalBudgetItems = (
  budgetItems?: SharedFinancialReportDto,
): ParsedBudgetItem[] => {
  const originalBudgetItemsFirstLayer =
    getOriginalBudgetItemsFirstLayer(budgetItems)

  return (
    (originalBudgetItemsFirstLayer as unknown as ParsedBudgetItem[])?.reduce<
      ParsedBudgetItem[]
    >(
      (acc, item) => [
        ...acc,
        { ...item, level: 1, hasChildren: true },
        ...getChildItems(item.budgetItemId, 2, budgetItems),
      ],
      [],
    ) ?? []
  )
}

export const getBudgetItemsWithCollapseState = (
  budgetItems: ParsedBudgetItem[],
  collapsedRowsIds: number[],
): ParsedBudgetItem[] =>
  getOriginalBudgetItems(budgetItems).reduce((acc, item) => {
    const hasParent = item.parent
    const isParentHidden = collapsedRowsIds?.some((row) => row === item.parent)
    const parentDoesntExist =
      acc.findIndex((el) => el.budgetItemId === item.parent) === -1

    if (hasParent && (isParentHidden || parentDoesntExist)) return acc
    return [...acc, item]
  }, [] as ParsedBudgetItem[])

export const getBudgetItemsWithSearchState = (
  budgetItems: ParsedBudgetItem[],
  searchValue: string,
): ParsedBudgetItem[] => {
  const parentsList = new Map<number, ParsedBudgetItem>([])

  const getParents = (nearestParentId: number): ParsedBudgetItem[] => {
    if (parentsList.has(nearestParentId)) {
      const nearestParent = parentsList.get(nearestParentId)!
      parentsList.delete(nearestParentId)

      let parentArr = [nearestParent]

      if (nearestParent.parent) {
        const hierarchyParents = getParents(nearestParent.parent)

        parentArr = [...hierarchyParents, ...parentArr]
      }

      return parentArr
    }

    return []
  }

  return budgetItems.reduce((acc, item) => {
    if (item.hasChildren) {
      parentsList.set(item.budgetItemId, item)

      return acc
    }

    if (item.budgetItemName.toLowerCase().includes(searchValue.toLowerCase())) {
      if (item.parent) {
        const parents = getParents(item.parent)

        return [...acc, ...parents, item]
      }

      return [...acc, item]
    }

    return acc
  }, [] as ParsedBudgetItem[])
}

// yearMonth 2022-11
export const getExpensesTitle = (yearMonth: string) => {
  const date = DateHelper.parse(yearMonth)
  const month = date.getMonth()
  const year = date.getFullYear()
  return `${MONTHS_RU[month]} ${year}`
}

export const getFormattedFirstDayOfMonth = ({
  year,
  month,
  format = DEFAULT_SERVER_DATE_FORMAT,
}: GetFormattedFirstDayOfMonthArg) => {
  const date = new Date()
  date.setFullYear(year, month, 1)
  return DateHelper.toFormat(date, format)
}
