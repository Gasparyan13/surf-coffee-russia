import { CreateFormPlannedOperationForm } from '../../FormPlannedOperation.types'

export type UseEditOperationFormDataParams = {
  editOperationId?: number
  onFormDataLoadComplete: (formData: CreateFormPlannedOperationForm) => void
  onDisabled: (disabled: boolean) => void
}
