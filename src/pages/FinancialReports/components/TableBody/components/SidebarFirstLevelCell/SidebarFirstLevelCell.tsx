import React from 'react'

import {
  ParsedBalanceBudgetItem,
  ParsedBudgetItem,
} from '../../TableBody.types'
import { InfoTooltip } from '../InfoTooltip'
import * as Styled from './SidebarFirstLevelCell.styled'
import * as T from './SidebarFirstLevelCell.types'

export const SidebarFirstLevelCell: <
  C extends ParsedBudgetItem | ParsedBalanceBudgetItem,
>(
  props: T.Props<C>,
) => React.ReactElement<T.Props<C>> = ({ data }) => {
  const { budgetItemName, level } = data
  const hasInfo = 'negatedItems' in data && !!data.negatedItems?.length
  const isFirstLevel = level === 1

  return (
    <Styled.FirstLevelCellContainer>
      <Styled.FirstLevelCellTitle>{budgetItemName}</Styled.FirstLevelCellTitle>
      {hasInfo && 'negatedItems' in data && (
        <InfoTooltip
          isFirstLevel={isFirstLevel}
          items={data.negatedItems}
          title={data.budgetItemName}
        />
      )}
    </Styled.FirstLevelCellContainer>
  )
}
