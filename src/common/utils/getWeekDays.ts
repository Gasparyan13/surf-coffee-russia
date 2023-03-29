import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'
import { enUS as localeEN, ru as localeRU } from 'date-fns/locale'

import { DateHelper } from '../helpers'

type WeekDaysParams = 'ru' | 'en'

export const getWeekDays = (locale?: WeekDaysParams): string[] => {
  let currentLocale = { locale: localeRU }

  if (locale === 'en') {
    currentLocale = { locale: localeEN }
  }

  const now = new Date()
  const weekDays: string[] = []
  const start = startOfWeek(now, currentLocale)
  const end = endOfWeek(now, currentLocale)

  eachDayOfInterval({ start, end }).forEach((day) => {
    weekDays.push(DateHelper.toLocaleFormat(day, 'EEEEEE', currentLocale))
  })

  return weekDays
}
