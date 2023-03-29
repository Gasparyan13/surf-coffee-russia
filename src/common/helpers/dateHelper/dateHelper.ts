import {
  addYears as fnsAddYears,
  differenceInDays,
  differenceInMonths,
  endOfMonth,
  format as fnsFormat,
  getUnixTime,
  isThisMonth as fnsIsThisMonth,
  isWeekend,
  parse as fnsParse,
  subYears as fnsSubYears,
} from 'date-fns'
import ru from 'date-fns/locale/ru'

import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_WITH_NAME_FORMAT,
  DEFAULT_SERVER_DATE_FORMAT,
  TIME_OF_DAY_FORMAT,
  YEAR_MONTH_FORMAT,
} from '../../constants'

type DateParam = Date | string

export class DateHelper {
  public static toFormat(
    date: DateParam,
    format = DEFAULT_DATE_FORMAT,
  ): string {
    return fnsFormat(DateHelper.toDate(date), format)
  }

  public static toLocaleFormat(
    date: DateParam,
    format = DEFAULT_DATE_WITH_NAME_FORMAT,
    options = {
      locale: ru,
    },
  ): string {
    return fnsFormat(DateHelper.toDate(date), format, options)
  }

  public static toServerDateFormat(date: Date): string {
    return DateHelper.toFormat(date, DEFAULT_SERVER_DATE_FORMAT)
  }

  public static formatServerDateToClient(serverDate: string): string {
    return fnsFormat(
      DateHelper.parse(serverDate, DEFAULT_SERVER_DATE_FORMAT),
      DEFAULT_DATE_FORMAT,
    )
  }

  public static formatClientDateToServer(clientDate: string): string {
    return fnsFormat(
      DateHelper.parse(clientDate, DEFAULT_DATE_FORMAT),
      DEFAULT_SERVER_DATE_FORMAT,
    )
  }

  public static toNumber(date: string): number {
    return getUnixTime(new Date(date))
  }

  public static toDate(date: string | Date): Date {
    if (typeof date === 'string') return new Date(date)
    return date
  }

  public static parse(date: string, format = YEAR_MONTH_FORMAT): Date {
    return fnsParse(date, format, new Date())
  }

  public static isWeekend(date: Date): boolean {
    return isWeekend(date)
  }

  public static getTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  public static subYears(date: Date, amount: number): Date {
    return fnsSubYears(date, amount)
  }

  public static addYears(date: Date, amount: number): Date {
    return fnsAddYears(date, amount)
  }

  public static isSameOrBeforeDay(
    currentDate: Date,
    compareDate: Date,
  ): boolean {
    return differenceInDays(currentDate, compareDate) <= 0
  }

  public static isSameOrAftereDay(
    currentDate: Date,
    compareDate: Date,
  ): boolean {
    return differenceInDays(currentDate, compareDate) >= 0
  }

  public static isBeforeMonth(currentDate: Date, compareDate: Date): boolean {
    return differenceInMonths(currentDate, compareDate) < 0
  }

  public static isCurrentMonth(date: DateParam): boolean {
    return fnsIsThisMonth(DateHelper.toDate(date))
  }

  public static isPreviousMonth(date: DateParam): boolean {
    const formattedDate = DateHelper.toDate(date)

    const pastMonth = new Date()
    pastMonth.setDate(1)
    pastMonth.setMonth(pastMonth.getMonth() - 1)
    pastMonth.toDateString()

    return (
      differenceInMonths(formattedDate, pastMonth) === 0 &&
      !DateHelper.isCurrentMonth(formattedDate)
    )
  }

  public static getDayOfTheWeek(date: Date): string {
    return fnsFormat(date, 'EEEE')
  }

  public static getEndOfMonth(date: DateParam): Date {
    return endOfMonth(DateHelper.toDate(date))
  }

  public static getTimeOfDay(date: DateParam): string {
    return DateHelper.toFormat(DateHelper.toDate(date), TIME_OF_DAY_FORMAT)
  }

  public static getStartOfMonth(date: DateParam): Date {
    const dateString = DateHelper.toFormat(date, 'yyyy-MM-01')

    return DateHelper.toDate(dateString)
  }
}
