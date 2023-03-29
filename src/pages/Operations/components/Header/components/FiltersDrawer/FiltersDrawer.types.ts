export type FiltersFormRefType = {
  onSubmit: () => Promise<void>
  isDirty: boolean
}

export type Props = {
  open: boolean
  onClose: () => void
}
