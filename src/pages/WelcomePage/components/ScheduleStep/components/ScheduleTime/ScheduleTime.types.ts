import {
  Control,
  FieldErrors,
  FieldNamesMarkedBoolean,
  UseFormHandleSubmit,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

import { HoursStepData, ScheduleTimeData } from '../../ScheduleStep.types'

export type Props = {
  control: Control<ScheduleTimeData>
  errors: FieldErrors<ScheduleTimeData>
  watch: UseFormWatch<ScheduleTimeData>
  setValue: UseFormSetValue<ScheduleTimeData>
  handleSubmit: UseFormHandleSubmit<ScheduleTimeData>
  reset: UseFormReset<ScheduleTimeData>
  isFormDirty: boolean
  dirtyFields: FieldNamesMarkedBoolean<ScheduleTimeData>
  refetchName: () => void
  hoursWeekData: HoursStepData | null
}
