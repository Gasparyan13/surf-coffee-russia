import { getDaysInMonth } from 'date-fns'
import React, { useMemo } from 'react'

import { WEEKDAYS_EN } from '@common/constants/weekdays'

import { DateHelper, makeNumberedArray, uuid } from '@helpers'

import { Root } from './CalendarTable.styled'
import * as T from './CalendarTable.types'
import { DailySalaryType } from './CalendarTable.types'
import { CalendarRow } from './components/CalendarRow'
import { dailySalaries } from './utils/getters'

export const CalendarTable: React.FC<T.Props> = ({
  yearMonth,
  dailyShiftData,
}) => {
  const daysInMonth = getDaysInMonth(DateHelper.toDate(yearMonth))

  const firstDayInFirstWeek = WEEKDAYS_EN.findIndex(
    (day) => day === DateHelper.getDayOfTheWeek(DateHelper.toDate(yearMonth)),
  )

  const dailySalariesData = dailySalaries(dailyShiftData as DailySalaryType[])

  const calendarData = useMemo(() => {
    const totalDays = firstDayInFirstWeek + daysInMonth
    const numberOfDays = 7
    const weeks = Math.ceil(totalDays / numberOfDays)
    return makeNumberedArray(weeks).map((weekIndex) => {
      const daysInWeek =
        weekIndex === weeks - 1
          ? daysInMonth -
            ((weekIndex - 1) * numberOfDays + firstDayInFirstWeek + 1)
          : numberOfDays

      const week = makeNumberedArray(daysInWeek).map((dayIndex) => {
        const dayNumber =
          weekIndex === 0
            ? dayIndex - firstDayInFirstWeek + 1
            : dayIndex + weekIndex * numberOfDays - firstDayInFirstWeek + 1

        if (
          (weekIndex === 0 && dayIndex < firstDayInFirstWeek) ||
          dayNumber > daysInMonth
        )
          return { dayNumber: null, id: uuid() }

        return {
          dayNumber,
          id: uuid(),
          ...(dailyShiftData ? dailySalariesData?.[dayNumber] : {}),
        }
      })
      return { week, id: uuid() }
    })
  }, [dailySalariesData, dailyShiftData, daysInMonth, firstDayInFirstWeek])

  return (
    <Root>
      {calendarData?.map(({ week, id }) => {
        return <CalendarRow key={id} days={week} />
      })}
    </Root>
  )
}
