import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form'

import { EnterpriseScheduleConfigForTimeSlotDto } from '@rtkApi/modules/__generated__/enterprise'

import { DialogFormData } from '../../DialogAddEmployeeShift.types'

export type Props = {
  setValue: UseFormSetValue<DialogFormData>
  watch: UseFormWatch<DialogFormData>
  control: Control<DialogFormData>
  shiftData?: EnterpriseScheduleConfigForTimeSlotDto
  selectedShiftDate: Date
}
