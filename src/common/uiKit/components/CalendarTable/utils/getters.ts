import { DateHelper } from '@helpers'

import { DailySalaryType } from '../CalendarTable.types'

export const dailySalaries = (
  data: DailySalaryType[],
): Record<number, DailySalaryType> =>
  data?.reduce((acc, { date, ...salary }) => {
    const dateFormat = DateHelper.toDate(date)
    const day = dateFormat.getDate()

    return {
      ...acc,
      [Number(day)]: salary,
    }
  }, {})
