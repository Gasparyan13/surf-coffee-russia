import React from 'react'

export type Props<T> = {
  items: T[]
  canAdd?: boolean
  renderContent: (item: T, index: number) => React.ReactElement
  onChange: (items: T[]) => void
  createItem: () => T
}
