import { YEAR_MONTH_FORMAT } from '../constants'
import { DateHelper } from '../helpers'

export const CURRENT_DATE = new Date()

export const getCurrentYear = (): number => CURRENT_DATE.getFullYear()
export const getCurrentMonth = (): number => CURRENT_DATE.getMonth()

export const getYearMonth = (date: Date): string[] => {
  return DateHelper.toFormat(date, YEAR_MONTH_FORMAT).split('-')
}

export const getCommonMaxDate = (): Date => DateHelper.addYears(CURRENT_DATE, 5)
export const getCommonMinDate = (): Date =>
  DateHelper.subYears(CURRENT_DATE, 10)
