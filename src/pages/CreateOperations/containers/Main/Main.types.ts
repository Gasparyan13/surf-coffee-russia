export type RefType = {
  onSubmit: () => Promise<void>
  isDirty: boolean
}

export type BaseFormProps = {
  editOperationId?: number
  onComplete: (pathnames?: string | string[]) => void
  onDisabled: (disabled: boolean) => void
}
