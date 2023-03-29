import { enUS as localeEN, ru as localeRU } from 'date-fns/locale'

import { makeNumberedArray } from '../helpers'
import { getWeekDays } from '../utils'

const localizeDays = (obj: Locale) =>
  makeNumberedArray(7, 1)
    .slice(0, 6)
    .concat(0)
    .map((el) => obj.localize?.day(el))

export const WEEKDAYS_EN = localizeDays(localeEN)
export const WEEKDAYS_RU = localizeDays(localeRU)
export const SHORT_WEEKDAYS_RU = getWeekDays('ru')
export const SHORT_WEEKDAYS_EN = getWeekDays('en')
