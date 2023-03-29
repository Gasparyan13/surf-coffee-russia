import { EnterpriseScheduleForDayViewDto } from '@rtkApi/modules/__generated__/enterprise'

import { DaysType } from '../Table.types'
import { NUMBER_CARDS_FOR_COLUMN_WIDTH_INCREASES } from '../constants/counts'
import { getIncreasedWidth } from './getters'

export const changeCellWidth = (
  arrayDays: DaysType[],
  schedule: EnterpriseScheduleForDayViewDto[],
) => {
  const newArrayDays = [...arrayDays]

  schedule.forEach((day) => {
    const lengthShiftsWorkersSlots = day.shiftsWorkersSlots?.length as number

    if (
      lengthShiftsWorkersSlots >= NUMBER_CARDS_FOR_COLUMN_WIDTH_INCREASES &&
      newArrayDays[(day.day as number) - 1]
    ) {
      newArrayDays[(day.day as number) - 1].cellWidth = getIncreasedWidth(
        lengthShiftsWorkersSlots,
      )
    }
  })

  return newArrayDays
}
