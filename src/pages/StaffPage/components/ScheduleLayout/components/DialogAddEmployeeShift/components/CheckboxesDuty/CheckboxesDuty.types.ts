import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'

import { DialogFormData } from '../../DialogAddEmployeeShift.types'

export type Props = {
  control: Control<DialogFormData>
  setValue: UseFormSetValue<DialogFormData>
  watch: UseFormWatch<DialogFormData>
  hasOffMorningDuty: boolean
  hasOffEveningDuty: boolean
  hasDutyMorningAppointed: boolean
  hasDutyEveningAppointed: boolean
}
