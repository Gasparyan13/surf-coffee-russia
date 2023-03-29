import { ListItem } from '@mui/material'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'

import { SvgCheckboxMinusIcon } from '@common/IconComponents/SvgCheckboxMinusIcon'
import { SvgCheckboxPlusIcon } from '@common/IconComponents/SvgCheckboxPlusIcon'

import { SearchTextHighlighter } from '@components'

import { ListRow } from '@uiKit'

import { BudgetItemViewDto } from '@rtkApi/modules/__generated__/analytics'

import { scrollToSelectedBudgetItem } from '../../utils/actions'
import {
  getIsContainsSelectedBudgetItem,
  getIsMatches,
  getIsMatchesChildren,
} from '../../utils/getters'
import * as Styled from './BudgetItem.styled'
import * as T from './BudgetItem.types'

export const BudgetItem: React.FC<T.Props> = ({
  level,
  onClick,
  id,
  name,
  optionIds,
  budgetItemsMap,
  selectedId,
  searchValue,
  isSelectedBudgetItem,
  isStartMatches,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = optionIds && optionIds?.length > 0
  const isContainsSelectedBudgetItem = getIsContainsSelectedBudgetItem(
    optionIds,
    selectedId,
    budgetItemsMap,
  )
  const isCurrentSelectedOption = selectedId === id
  const isSelectedOption =
    isCurrentSelectedOption || (isContainsSelectedBudgetItem && !isOpen)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      if (optionIds.length) {
        event.stopPropagation()
      }

      setIsOpen((prev) => !prev)

      const currentOption = budgetItemsMap[id]!
      const value: BudgetItemViewDto = {
        rootId: currentOption.rootId,
        level: currentOption.level,
        id: currentOption.id,
        name: currentOption.name,
        parentItemId: currentOption.parentItemId,
        isExpense: currentOption.isExpense,
        isExternal: currentOption.isExternal,
        isCapitalAssets: currentOption.isCapitalAssets,
        children: currentOption.children,
      }
      onClick(value)
    },
    [budgetItemsMap, id, onClick, optionIds.length],
  )

  const renderIcon = () => {
    if (!hasChildren) return

    return (
      <Styled.Icon>
        {isOpen ? <SvgCheckboxMinusIcon /> : <SvgCheckboxPlusIcon />}
      </Styled.Icon>
    )
  }

  useEffect(() => {
    if (
      (!isSelectedBudgetItem && isStartMatches) ||
      (isSelectedBudgetItem && isContainsSelectedBudgetItem)
    )
      setIsOpen(true)
  }, [isStartMatches, isSelectedBudgetItem, isContainsSelectedBudgetItem])

  useLayoutEffect(() => {
    if (isSelectedBudgetItem && isCurrentSelectedOption)
      scrollToSelectedBudgetItem()
  }, [isCurrentSelectedOption, isSelectedBudgetItem])

  if (
    hasChildren &&
    !isSelectedBudgetItem &&
    !getIsMatchesChildren(optionIds, searchValue, budgetItemsMap)
  )
    return null

  const text =
    !hasChildren && !isSelectedBudgetItem ? (
      <SearchTextHighlighter searchWords={searchValue} value={name} />
    ) : (
      name
    )

  return (
    <>
      <ListRow
        {...props}
        key={id}
        css={Styled.selectSubArticleCSS({
          $level: level,
          $hasIcon: hasChildren,
        })}
        isSelected={isSelectedOption}
        leftIcon={renderIcon()}
        text={text}
        title={name}
        value={id}
        onClick={handleClick}
      />
      {isOpen && (
        <ListItem css={Styled.selectArticlesCSS}>
          <Styled.List>
            {optionIds?.map((option) => {
              const budgetItem = budgetItemsMap[option]

              if (!budgetItem) return

              const hasChildrenBudgetItem = budgetItem.children!.length > 0
              const isMatchesBudgetItem = getIsMatches(
                budgetItem.name!,
                searchValue,
              )

              if (
                !budgetItem.isVisible ||
                (!isMatchesBudgetItem &&
                  !hasChildrenBudgetItem &&
                  !isSelectedBudgetItem)
              )
                return

              return (
                <BudgetItem
                  key={budgetItem.id}
                  budgetItemsMap={budgetItemsMap}
                  id={budgetItem.id!}
                  isSelectedBudgetItem={isSelectedBudgetItem}
                  isStartMatches={isStartMatches}
                  level={budgetItem.level!}
                  name={budgetItem.name!}
                  optionIds={budgetItem.children!}
                  searchValue={searchValue}
                  selectedId={selectedId}
                  onClick={onClick}
                />
              )
            })}
          </Styled.List>
        </ListItem>
      )}
    </>
  )
}
