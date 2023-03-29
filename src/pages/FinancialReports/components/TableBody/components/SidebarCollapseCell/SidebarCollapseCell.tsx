import React, { useCallback, useRef, useState } from 'react'

import { SvgCheckboxMinusIcon } from '@common/IconComponents/SvgCheckboxMinusIcon'
import { SvgCheckboxPlusIcon } from '@common/IconComponents/SvgCheckboxPlusIcon'
import { pl } from '@common/common.styled'
import { Nullable } from '@common/types/Nullable'

import { SearchTextHighlighter } from '@components'

import { Tooltip } from '@uiKit/components/Tooltip'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import {
  ParsedBalanceBudgetItem,
  ParsedBudgetItem,
} from '../../TableBody.types'
import { hasNoIcon, isRoot } from '../../utils/checkup'
import { getOuterPaddingLevel } from '../../utils/getOuterPaddingLevel'
import { InfoTooltip } from '../InfoTooltip'
import * as Styled from './SidebarCollapseCell.styled'
import {
  tooltipBudgetCSS,
  tooltipHasChildrenCSS,
} from './SidebarCollapseCell.styled'
import * as T from './SidebarCollapseCell.types'
import { TEST_ID_CELL_CONTENT_CONTAINER } from './constants/testIds'

export const SidebarCollapseCell: <
  C extends ParsedBudgetItem | ParsedBalanceBudgetItem,
>(
  props: T.Props<C>,
) => React.ReactElement<T.Props<C>> = ({
  data,
  nextRowDataParentId,
  onToggleExpandRow,
  searchValue,
}) => {
  const [tooltipEnabled, setTooltipEnabled] = useState(false)
  const ref = useRef<Nullable<HTMLDivElement>>(null)
  const { budgetItemId, hasChildren, budgetItemName } = data
  const isFirstLevel = data.level === 1
  const hasInfo = 'negatedItems' in data && !!data.negatedItems?.length
  const areChildrenHidden = nextRowDataParentId !== budgetItemId

  const handleToggleRowClick = useCallback(
    () => onToggleExpandRow(budgetItemId!),
    [budgetItemId, onToggleExpandRow],
  )

  const handleShowTooltip = useCallback(() => {
    if (ref.current) {
      const { scrollWidth, clientWidth } = ref.current
      setTooltipEnabled(scrollWidth > clientWidth)
    }
  }, [])

  const handleHideTooltip = useCallback(() => setTooltipEnabled(false), [])

  const content = !hasChildren ? (
    <SearchTextHighlighter searchWords={searchValue} value={budgetItemName} />
  ) : (
    budgetItemName
  )

  return (
    <Styled.CollapseCellContainer
      $hasChildren={hasChildren}
      css={pl(getOuterPaddingLevel(data.level, hasChildren))}
      onClick={handleToggleRowClick}>
      {hasChildren && (
        <Styled.Icon>
          {!areChildrenHidden ? (
            <SvgCheckboxMinusIcon />
          ) : (
            <SvgCheckboxPlusIcon />
          )}
        </Styled.Icon>
      )}
      <Tooltip
        css={
          hasChildren
            ? [tooltipBudgetCSS, tooltipHasChildrenCSS]
            : tooltipBudgetCSS
        }
        disableHoverListener={!tooltipEnabled}
        placement="above-center"
        title={budgetItemName || ''}
        onMouseEnter={handleShowTooltip}
        onMouseLeave={handleHideTooltip}>
        <Styled.Content
          ref={ref}
          {...createTestId(TEST_ID_CELL_CONTENT_CONTAINER)}
          $hasNoIcon={hasNoIcon(data.level, hasChildren)}
          $isHighlighting={!!searchValue && !hasChildren}
          $isRoot={isRoot(data.level) || hasChildren}>
          {content}
        </Styled.Content>
      </Tooltip>
      {hasInfo && (
        <InfoTooltip
          isFirstLevel={isFirstLevel}
          items={data.negatedItems}
          title={data.budgetItemName}
        />
      )}
    </Styled.CollapseCellContainer>
  )
}
