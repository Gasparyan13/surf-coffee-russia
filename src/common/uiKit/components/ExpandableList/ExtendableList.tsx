import React, { useCallback } from 'react'

import * as T from './ExtendableList.types'
import { ExtendableListItem } from './components/ExtendableListItem'

export const ExtendableList: <
  P extends { id: string | number; disabled?: boolean },
>(
  p: T.Props<P>,
) => React.ReactElement<T.Props<P>> = ({
  items,
  renderContent,
  onChange,
  createItem,
  canAdd = true,
}) => {
  const handleAddItem = useCallback(
    () => onChange([...items, createItem()]),
    [createItem, items, onChange],
  )

  const handleRemoveItem = (index: number) => () =>
    onChange(items.filter((_, idx) => idx !== index))

  return (
    <>
      {items.map((item, index) => (
        <ExtendableListItem
          key={item.id}
          canAdd={canAdd && index === items.length - 1}
          canRemove={!item.disabled && items.length > 1}
          onAdd={handleAddItem}
          onRemove={handleRemoveItem(index)}>
          {renderContent(item, index)}
        </ExtendableListItem>
      ))}
    </>
  )
}
