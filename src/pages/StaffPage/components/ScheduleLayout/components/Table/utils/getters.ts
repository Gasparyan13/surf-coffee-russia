import { getDay, getDaysInMonth } from 'date-fns'

import { SHORT_WEEKDAYS_RU } from '@constants/weekdays'

import { DateHelper, makeNumberedArray } from '@helpers'

import { EnterpriseScheduleForDayViewDto } from '@rtkApi/modules/__generated__/enterprise'

import { DaysType, ShiftsWorkersSlotsWidths } from '../Table.types'
import { NUMBER_CARDS_FOR_COLUMN_WIDTH_INCREASES } from '../constants/counts'
import {
  CART_WIDTH,
  CELL_WIDTH,
  SMALL_CARD_MARGIN,
  SMALL_CARD_WIDTH,
  SPACING_BETWEEN_CARDS,
} from '../constants/size'

export const getDays = (year: number, month: number): DaysType[] => {
  const date = new Date(year, month)
  const days = getDaysInMonth(date)
  const arrayDays = makeNumberedArray(days)
  const currentDate = new Date()
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  return arrayDays.map((item, index) => {
    const currentDateInArray = new Date(year, month, index)
    const currentDayOfTheWeek = getDay(currentDateInArray)

    return {
      id: index,
      dayNumber: index + 1,
      dayName: SHORT_WEEKDAYS_RU[currentDayOfTheWeek],
      cellWidth: CELL_WIDTH,
      isCurrentDay:
        currentDay === index + 1 &&
        currentMonth === month &&
        currentYear === year,
    }
  })
}

export const getCardWidth = (schedule: EnterpriseScheduleForDayViewDto[]) => {
  let shiftsWorkersSlotsWidths: ShiftsWorkersSlotsWidths = {}

  schedule.forEach((day) => {
    let isSmallCard = false

    day.shiftsWorkersSlots?.forEach((shift, index, array) => {
      // Всегда для случаев > 3 смен, будут маленькие карточки
      if (array.length >= NUMBER_CARDS_FOR_COLUMN_WIDTH_INCREASES) {
        shiftsWorkersSlotsWidths = {
          ...shiftsWorkersSlotsWidths,
          [day.day as number]: {
            ...shiftsWorkersSlotsWidths[day.day as number],
            [shift.timeSlotId as number]: SMALL_CARD_WIDTH,
          },
        }
        return
      }

      // случай с двумя сменами в дне и если пересекаются
      if (array[index + 1]) {
        const endCurrentDay = DateHelper.toDate(shift.endTime as string)
        const startNextDay = DateHelper.toDate(
          array[index + 1].startTime as string,
        )
        const endCurrentHour = endCurrentDay.getHours()
        const startNextHour = startNextDay.getHours()

        if (startNextHour - endCurrentHour < 0) {
          isSmallCard = true
        }
      }

      shiftsWorkersSlotsWidths = {
        ...shiftsWorkersSlotsWidths,
        [day.day as number]: {
          ...shiftsWorkersSlotsWidths[day.day as number],
          [shift.timeSlotId as number]: isSmallCard
            ? SMALL_CARD_WIDTH
            : CART_WIDTH,
        },
      }
    })
  })

  return shiftsWorkersSlotsWidths
}

export const getIncreasedWidth = (length: number): number => {
  return (
    SMALL_CARD_WIDTH * length +
    SPACING_BETWEEN_CARDS * (length - 1) +
    SMALL_CARD_MARGIN * 2
  )
}
