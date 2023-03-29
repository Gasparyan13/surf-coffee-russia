import React from 'react'

import {
  ParsedBalanceBudgetItem,
  ParsedBudgetItem,
} from '../../TableBody.types'
import { SidebarCollapseCell } from '../SidebarCollapseCell'
import { SidebarFirstLevelCell } from '../SidebarFirstLevelCell'
import * as T from './SidebarDataCell.types'

export const SidebarDataCell: <
  C extends ParsedBudgetItem | ParsedBalanceBudgetItem,
>(
  props: T.Props<C>,
) => React.ReactElement<T.Props<C>> = ({
  data,
  onToggleExpandRow,
  rowIndex = 0,
  searchValue,
}) => {
  const cellData = data[rowIndex] ?? {}
  const isFirstLevel = cellData.level === 1
  const nextRowIndex = rowIndex + 1
  const nextRowDataParentId =
    data.length > nextRowIndex ? data[nextRowIndex]?.parent : null

  return isFirstLevel ? (
    <SidebarFirstLevelCell data={cellData} />
  ) : (
    <SidebarCollapseCell
      data={cellData}
      nextRowDataParentId={nextRowDataParentId}
      searchValue={searchValue}
      onToggleExpandRow={onToggleExpandRow}
    />
  )
}
