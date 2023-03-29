import React from 'react'

import { render, screen } from '@testEnv/utils'

import { CalendarTable } from './CalendarTable'
import * as T from './CalendarTable.types'

describe('<CalendarTable/>', () => {
  const shiftData: T.DailySalaryType[] = [
    { id: 232, date: '2022-09-01', hours: '1.50', money: '1500.00' },
    { id: 233, date: '2022-09-02', hours: '2.50', money: '2500.00' },
  ]
  const renderCalendarTable = ({
    yearMonth = '2022-09',
    dailyShiftData = shiftData,
  }: Partial<T.Props>) =>
    render(
      <CalendarTable dailyShiftData={dailyShiftData} yearMonth={yearMonth} />,
    )

  describe('when render calendar', () => {
    it('should render worker calendar', async () => {
      renderCalendarTable({})

      const dayOfTheWeekFirstDay = screen.getAllByText('чт')[0]
      expect(dayOfTheWeekFirstDay).toBeInTheDocument()

      const firstDay = screen.getAllByText('01')[0]
      expect(firstDay).toBeInTheDocument()

      const firstDaySum = screen.getAllByText('1 500 ₽')[0]
      expect(firstDaySum).toBeInTheDocument()

      const firstDayHours = screen.getAllByText('1.50 ч.')[0]
      expect(firstDayHours).toBeInTheDocument()

      const dayOfTheWeekSecondDay = screen.getAllByText('пт')[1]
      expect(dayOfTheWeekSecondDay).toBeInTheDocument()

      const secondDay = screen.getAllByText('02')[0]
      expect(secondDay).toBeInTheDocument()

      const secondDaySum = screen.getAllByText('2 500 ₽')[0]
      expect(secondDaySum).toBeInTheDocument()

      const secondDayHours = screen.getAllByText('2.50 ч.')[0]
      expect(secondDayHours).toBeInTheDocument()
    })

    it('should render calendar out of employment', async () => {
      renderCalendarTable({ dailyShiftData: [] })

      const dayOfTheWeekFirstDay = screen.getAllByText('чт')[0]
      expect(dayOfTheWeekFirstDay).toBeInTheDocument()

      const firstDay = screen.getAllByText('01')[0]
      expect(firstDay).toBeInTheDocument()

      expect(screen.queryByText('1 500 ₽')).not.toBeInTheDocument()

      expect(screen.queryByText('1.50 ч.')).not.toBeInTheDocument()

      const dayOfTheWeekSecondDay = screen.getAllByText('пт')[1]
      expect(dayOfTheWeekSecondDay).toBeInTheDocument()

      const secondDay = screen.getAllByText('02')[0]
      expect(secondDay).toBeInTheDocument()

      expect(screen.queryByText('2 500 ₽')).not.toBeInTheDocument()

      expect(screen.queryByText('2.50 ч.')).not.toBeInTheDocument()
    })
  })

  describe('when render september calendar', () => {
    it('should render september 2022 calendar', async () => {
      renderCalendarTable({})

      const firstDay = screen.getAllByText('01')
      expect(firstDay[0]).toBeInTheDocument()

      const lastDay = screen.getAllByText('30')
      expect(lastDay[lastDay.length - 1]).toBeInTheDocument()
    })
  })
})
