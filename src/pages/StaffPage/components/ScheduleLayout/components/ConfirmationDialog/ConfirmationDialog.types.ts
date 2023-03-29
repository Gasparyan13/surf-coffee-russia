import React from 'react'
import { UseFormReset } from 'react-hook-form'

import { DialogFormData } from '../DialogAddEmployeeShift/DialogAddEmployeeShift.types'

export type Props = {
  isOpen: boolean
  onCloseDialog: () => void
  reset: UseFormReset<DialogFormData>
  setShowConfirmationDialog: React.Dispatch<React.SetStateAction<boolean>>
  setShowShiftDialog: React.Dispatch<React.SetStateAction<boolean>>
}
