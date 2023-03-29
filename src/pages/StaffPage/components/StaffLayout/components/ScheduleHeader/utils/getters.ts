import { MONTHS_RU, YEAR_MONTH_FORMAT } from '@constants'

import { DateHelper, makeNumberedArray } from '@helpers'

export const getYearMonthOptions = (year: number) =>
  makeNumberedArray(12).map((month, index) => ({
    value: DateHelper.toFormat(new Date(year, month, 1), YEAR_MONTH_FORMAT),
    text: `${MONTHS_RU[index]}, ${year}`,
    key: month,
  }))
