import React from 'react'
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'

import { DialogFormData } from '../../DialogAddEmployeeShift.types'

export type Props = {
  control: Control<DialogFormData>
  setValue: UseFormSetValue<DialogFormData>
  watch: UseFormWatch<DialogFormData>
  handleAddNewShift: (e?: React.BaseSyntheticEvent | undefined) => Promise<void>
  onClose: () => void
}
