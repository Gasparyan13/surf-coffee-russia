import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

import * as T from './useSaveCollapsedRows.types'

export const useSaveCollapsedRows = <S>({
  rows,
  onChangeExpandedRows,
  localStorageKey,
}: T.UseSaveCollapsedRowsParams<S>): T.HookReturn => {
  const [collapsedRowsIds, setCollapsedRowsIds] = useState<number[]>([])

  const handleToggleExpandRow = useCallback(
    (tableRowId: number) => {
      let newCollapsedRowsIds = collapsedRowsIds

      if (newCollapsedRowsIds.includes(tableRowId)) {
        newCollapsedRowsIds = newCollapsedRowsIds.filter(
          (id) => id !== tableRowId,
        )
      } else {
        newCollapsedRowsIds = [...newCollapsedRowsIds, tableRowId]
      }

      setCollapsedRowsIds(newCollapsedRowsIds)

      if (Array.isArray(collapsedRowsIds)) {
        localStorage.setItem(
          localStorageKey,
          JSON.stringify(newCollapsedRowsIds),
        )
      }
    },
    [collapsedRowsIds, localStorageKey],
  )

  useEffect(() => {
    onChangeExpandedRows?.(collapsedRowsIds)
  }, [rows, collapsedRowsIds])

  // Collapsed Items saving to localStorage
  useLayoutEffect(() => {
    const savedData = localStorage.getItem(localStorageKey)
    if (savedData) {
      const savedRaws = JSON.parse(savedData)
      if (Array.isArray(savedRaws)) setCollapsedRowsIds(savedRaws)
    }
  }, [])

  return {
    handleToggleExpandRow,
    collapsedRowsIds,
  }
}
