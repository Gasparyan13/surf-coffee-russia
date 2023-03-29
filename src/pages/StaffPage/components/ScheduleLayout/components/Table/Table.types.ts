import { EnterpriseScheduleForDayViewDto } from '@rtkApi/modules/__generated__/enterprise'

export type DaysType = {
  id: number
  dayNumber: number
  dayName: string
  cellWidth: number
  isCurrentDay: boolean
}

export type GeneralType = {
  days: DaysType[]
}

export type Props = {
  schedule?: EnterpriseScheduleForDayViewDto[]
  month: number
  year: number
}

export type ShiftsWorkersSlotsWidths = {
  [key: number]: { [key: number]: number }
}
