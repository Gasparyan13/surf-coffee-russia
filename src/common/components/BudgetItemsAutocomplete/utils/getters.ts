import { FilterOptionsState } from '@mui/base'

import { VALUE_TO_START_SEARCHING } from '@common/constants'
import { Nullable } from '@common/types/Nullable'

import { BudgetItemViewDto } from '@rtkApi/modules/__generated__/prepayment'

import {
  BudgetItemsMap,
  ExcludedBudgetItems,
} from '../BudgetItemsAutocomplete.types'

export const getBudgetItemsMap = (
  budgetItems: BudgetItemViewDto[],
): BudgetItemsMap => {
  const budgetItemsMap: BudgetItemsMap = {}

  budgetItems.forEach((item) => {
    budgetItemsMap[item.id!] = {
      ...item,
      isVisible: true,
    }
  })

  return budgetItemsMap
}

const resetBudgetItemsMap = (budgetItemsMap: BudgetItemsMap) => {
  Object.keys(budgetItemsMap).forEach((id) => {
    const currentId = Number(id)

    if (!budgetItemsMap[currentId].isVisible)
      budgetItemsMap[currentId].isVisible = true
  })

  return budgetItemsMap
}

export const getFilteredBudgetItems = (
  excludedBudgetItems: Nullable<ExcludedBudgetItems>,
  budgetItemsMap: BudgetItemsMap,
): BudgetItemsMap | undefined => {
  const isVisibleExcludedBudgetItemInMap =
    excludedBudgetItems && budgetItemsMap[excludedBudgetItems[0]].isVisible

  if (!excludedBudgetItems) return resetBudgetItemsMap({ ...budgetItemsMap })

  if (!isVisibleExcludedBudgetItemInMap) return

  return excludedBudgetItems.reduce(
    (acc, item) => {
      acc[item].isVisible = false
      return acc
    },
    { ...budgetItemsMap },
  )
}

export const getBudgetItemsWithoutRoots = (
  budgetItems: BudgetItemViewDto[],
): BudgetItemViewDto[] => {
  return budgetItems.filter((item) => item.rootId !== null)
}

export const getFirstLevelBudgetItems = (
  budgetItems: BudgetItemViewDto[],
): number[] => {
  return budgetItems.filter((item) => item.level === 1).map((item) => item.id!)
}

export const getIsStartMatches = (value: string) =>
  value.length >= VALUE_TO_START_SEARCHING

export const getIsMatches = (itemName: string, searchValue: string): boolean =>
  itemName.toLowerCase().includes(searchValue.toLowerCase())

export const filterOptions = (
  options: BudgetItemViewDto[],
  state: FilterOptionsState<BudgetItemViewDto>,
) => {
  if (state.inputValue.length < VALUE_TO_START_SEARCHING) return options

  const parentsList = new Map<number, BudgetItemViewDto>([])

  const getParents = (nearestParentId: number): BudgetItemViewDto[] => {
    if (parentsList.has(nearestParentId)) {
      const nearestParent = parentsList.get(nearestParentId)!
      parentsList.delete(nearestParentId)

      let parentArr = [nearestParent]

      if (nearestParent.parentItemId) {
        const hierarchyParents = getParents(nearestParent.parentItemId)

        parentArr = [...hierarchyParents, ...parentArr]
      }

      return parentArr
    }

    return []
  }

  return options.reduce((acc, item) => {
    if (item.children?.length) {
      if (item.level !== 0) parentsList.set(item.id!, item)

      return acc
    }

    if (getIsMatches(item.name!, state.inputValue)) {
      if (item.parentItemId !== null) {
        const parents = getParents(item.parentItemId!)

        return [...acc, ...parents, item]
      }

      return [...acc, item]
    }

    return acc
  }, [] as BudgetItemViewDto[])
}

export const getIsMatchesChildren = (
  childrenIds: number[],
  searchValue: string,
  budgetItemsMap: BudgetItemsMap,
): boolean => {
  const checkChildrenForMatching = (optionId: number) => {
    const option = budgetItemsMap[optionId]

    if (!option.isVisible) return

    if (option.children!.length > 0) {
      return getIsMatchesChildren(option.children!, searchValue, budgetItemsMap)
    }

    return getIsMatches(option.name!, searchValue)
  }

  return childrenIds.length > 0
    ? childrenIds.some((optionId) => checkChildrenForMatching(optionId))
    : false
}

export const getIsContainsSelectedBudgetItem = (
  childrenIds: number[],
  selectedId: Nullable<number>,
  budgetItemsMap: BudgetItemsMap,
): boolean => {
  const checkChildrenForSelected = (optionId: number) => {
    const option = budgetItemsMap[optionId]

    if (!option) return null

    if (option.children!.length > 0) {
      return getIsContainsSelectedBudgetItem(
        option.children!,
        selectedId,
        budgetItemsMap,
      )
    }

    return option.id === selectedId
  }

  return childrenIds.length > 0
    ? childrenIds.some((optionId) => checkChildrenForSelected(optionId))
    : false
}

export const getRelativeOffsetTop = (
  parent: HTMLElement,
  elem: HTMLElement,
) => {
  let offsetTop = 0
  let currentParent: HTMLElement = elem.offsetParent as HTMLElement

  while (currentParent !== parent) {
    offsetTop += currentParent.offsetTop

    if (currentParent.offsetParent !== null) {
      currentParent = currentParent.offsetParent as HTMLElement
    } else {
      currentParent = parent
    }
  }

  return offsetTop
}
