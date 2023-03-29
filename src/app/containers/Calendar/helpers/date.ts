import { TIME_OF_DAY_FORMAT } from '@constants'

import { DateHelper } from '@helpers'

export const formatCalendarDate = (date: Date) => DateHelper.getTimeOfDay(date)
export const parseCalendarDate = (date: string) =>
  DateHelper.parse(date, TIME_OF_DAY_FORMAT)
