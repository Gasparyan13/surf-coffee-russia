import React, { useCallback, useEffect } from 'react'

import { MONTH_YEAR_FORMAT } from '@constants'

import { DateHelper } from '@helpers'

import { useLocationQuery } from '@hooks'

import { DatePicker } from '@uiKit'

import { getCommonMinDate, getYearMonth } from '@utils'

import { PATH_MONTH, PATH_YEAR } from './YearMonthUrlDatePicker.constants'
import * as Styled from './YearMonthUrlDatePicker.styled'

export const YearMonthUrlDatePicker: React.FC = () => {
  const { get, set } = useLocationQuery()
  const pathYear = get(PATH_YEAR)
  const pathMonth = get(PATH_MONTH)

  const value =
    pathMonth && pathYear ? DateHelper.parse(`${pathYear}-${pathMonth}`) : null

  const handleChange = useCallback(
    (newMonthYear: Date) => {
      const [year, month] = getYearMonth(newMonthYear)

      set([
        { key: PATH_MONTH, value: month },
        { key: PATH_YEAR, value: year },
      ])
    },
    [set],
  )

  useEffect(() => {
    if (!pathMonth || !pathYear) {
      const [year, month] = getYearMonth(new Date())

      set([
        { key: PATH_MONTH, value: month },
        { key: PATH_YEAR, value: year },
      ])
    }
  }, [pathMonth, pathYear])

  return (
    <Styled.Root>
      <DatePicker
        inputReadOnly
        inputFormat={MONTH_YEAR_FORMAT}
        maxDate={new Date()}
        minDate={getCommonMinDate()}
        openTo="month"
        placeholder="Выберите период"
        value={value}
        views={['year', 'month']}
        onChange={handleChange}
      />
    </Styled.Root>
  )
}
