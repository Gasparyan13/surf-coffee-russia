import { yup } from '../../../../../../../app/core'
import { DialogFormData } from '../DialogAddEmployeeShift.types'
import { EDuty } from '../types/enums'

export const defaultValues: DialogFormData = {
  allShifts: [{ id: null, name: '', start: '', end: '' }],
  dutyMorning: EDuty.Off,
  dutyEvening: EDuty.Off,
  presetId: null,
  shiftName: '',
  shiftStart: '',
  shiftEnd: '',
  date: new Date(),
  employee: null,
}

export const schema = yup.object().shape({})
