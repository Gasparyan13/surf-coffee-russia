import React from 'react'

export type Props = {
  children: React.ReactNode
  onAdd?: () => void
  onRemove?: () => void
  canAdd?: boolean
  canRemove?: boolean
}
