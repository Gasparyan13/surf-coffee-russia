import { formatCalendarDate } from '@app/containers/Calendar/helpers/date'

export const getFormatShiftTimeValue = (timestamp: string | number): string =>
  typeof timestamp === 'number'
    ? formatCalendarDate(new Date(timestamp))
    : timestamp
