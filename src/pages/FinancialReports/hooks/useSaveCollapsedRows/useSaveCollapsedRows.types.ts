export type UseSaveCollapsedRowsParams<T> = {
  rows?: T[]
  onChangeExpandedRows?: (collapsedRowsIds: number[]) => void
  localStorageKey: string
}

export type HookReturn = {
  handleToggleExpandRow: (tableRowId: number) => void
  collapsedRowsIds: number[]
}
