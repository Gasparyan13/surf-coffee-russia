import {
  BalanceSheetSectionalViewDto,
  BalanceSheetViewDto,
} from '@rtkApi/modules/__generated__/analytics'

import { ParsedBalanceBudgetItem } from '../../TableBody/TableBody.types'
import {
  FIXED_ROW_HEIGHT,
  SCROLLBAR_OFFSET_WIDTH,
  SIDEBAR_MIN_WIDTH,
  TOTALS_WIDTH,
  VIRTUALIZED_TABLE_PADDING,
} from '../constants'

export const getFormattedBalanceItems = (
  data: BalanceSheetSectionalViewDto,
) => {
  const {
    sumMismatch: sumMismatchStart,
    assets: assetsStart,
    obligations: obligationsStart,
    assetsTotal: assetsTotalStart,
    obligationsTotal: obligationsTotalStart,
  } = data.periodStartSheet as Required<BalanceSheetViewDto>

  const {
    sumMismatch: sumMismatchEnd,
    assets: assetsEnd,
    obligations: obligationsEnd,
    assetsTotal: assetsTotalEnd,
    obligationsTotal: obligationsTotalEnd,
  } = data.periodEndSheet as Required<BalanceSheetViewDto>

  const sumMismatch = [sumMismatchStart, sumMismatchEnd]

  const mergedAssets = assetsStart.map((startAsset, index) => ({
    ...startAsset,
    totalSum: [startAsset.totalSum!, assetsEnd[index].totalSum!],
  }))
  const mergedObligations = obligationsStart.map((startObligation, index) => ({
    ...startObligation,
    totalSum: [startObligation.totalSum!, obligationsEnd[index].totalSum!],
  }))

  const formattedData = {
    assets: {
      items: mergedAssets,
      itemName: 'Активы',
      totalSum: [assetsTotalStart, assetsTotalEnd],
    },
    obligations: {
      items: mergedObligations,
      itemName: 'Обязательства',
      totalSum: [obligationsTotalStart, obligationsTotalEnd],
    },
  }

  const initialLevel = 2
  const chunks = Object.keys(formattedData)

  return chunks.reduce((acc, key, chunkIndex) => {
    const parentIndex = chunkIndex + 1
    const indexNormalizer = chunks.length + 1
    const item = formattedData[key as keyof typeof formattedData]
    const hasChildren = !!item!.items!.length

    let childrenArr: ParsedBalanceBudgetItem[] = []
    if (hasChildren) {
      // collect all parentIds
      const childParentIds: Set<number> = new Set()
      item!.items!.forEach((child) => {
        childParentIds.add(child.parentId!)
      })
      const childParentIdsArr = Array.from(childParentIds)

      // add parent link to children
      childrenArr = item!.items!.reduce((chldrenAcc, subItem) => {
        const subLevel = initialLevel + 1

        return [
          ...chldrenAcc,
          {
            budgetItemId: subItem.id! + indexNormalizer,
            level: subItem.parentId ? subLevel + 1 : subLevel,
            budgetItemName: subItem.itemName!,
            totalSum: subItem.totalSum!,
            parent: subItem.parentId
              ? subItem.parentId + indexNormalizer
              : parentIndex,
            hasChildren: childParentIdsArr.includes(subItem.id!),
          },
        ]
      }, [] as ParsedBalanceBudgetItem[])
    }

    return [
      ...acc,
      {
        budgetItemId: parentIndex,
        level: 2,
        budgetItemName: item.itemName,
        totalSum: item.totalSum!,
        sumMismatch,
        hasChildren,
      },
      ...childrenArr,
    ]
  }, [] as ParsedBalanceBudgetItem[])
}

export const getTableFooterHeight = (
  height: number,
  filteredItemsLength: number,
  offset = 0,
) => {
  const bottomOffset =
    height -
    FIXED_ROW_HEIGHT * filteredItemsLength -
    VIRTUALIZED_TABLE_PADDING -
    offset

  return bottomOffset > 0 ? bottomOffset : 0
}

export const getFilteredRows = (
  rows: ParsedBalanceBudgetItem[],
  collapsedRowsIds: number[],
) =>
  rows.reduce((acc, item) => {
    const hasParent = item.parent
    const isParentHidden = collapsedRowsIds.some((row) => row === item.parent)
    const parentDoesntExist =
      acc.findIndex(
        (visibleItem) => visibleItem.budgetItemId === item.parent,
      ) === -1

    if (hasParent && (isParentHidden || parentDoesntExist)) return acc
    return [...acc, item]
  }, [] as ParsedBalanceBudgetItem[])

export const getSidebarWidth = (width: number) => {
  const dynamicWidth = width - SCROLLBAR_OFFSET_WIDTH - TOTALS_WIDTH * 2

  return dynamicWidth > SIDEBAR_MIN_WIDTH ? dynamicWidth : SIDEBAR_MIN_WIDTH
}
