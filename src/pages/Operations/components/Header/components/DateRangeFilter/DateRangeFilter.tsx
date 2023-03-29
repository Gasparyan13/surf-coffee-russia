import React, { useCallback } from 'react'

import { DEFAULT_DATE_FORMAT, PATHS } from '@common/constants'

import { DateHelper } from '@helpers'

import { useLocationQuery } from '@hooks'

import { DatePicker, Typography } from '@uiKit'

import { OperationsReportUrlSearchParams } from '../../../OperationsReport/constants/urlSearchParams'
import * as Styled from './DateRangeFilter.styled'

export const DateRangeFilter: React.FC = () => {
  const { get, set } = useLocationQuery({
    defaultParams: [
      {
        pathname: PATHS.operations,
        key: OperationsReportUrlSearchParams.startDate,
        value: DateHelper.toFormat(DateHelper.getStartOfMonth(new Date())),
      },
      {
        pathname: PATHS.operations,
        key: OperationsReportUrlSearchParams.endDate,
        value: DateHelper.toFormat(DateHelper.getEndOfMonth(new Date())),
      },
    ],
  })

  const handleChangeStartDate = useCallback(
    (newDate: Date) => {
      set({
        key: OperationsReportUrlSearchParams.startDate,
        value: DateHelper.toFormat(newDate),
      })
    },
    [set],
  )

  const handleChangeEndDate = useCallback(
    (newDate: Date) => {
      set({
        key: OperationsReportUrlSearchParams.endDate,
        value: DateHelper.toFormat(newDate),
      })
    },
    [set],
  )

  const startDateString = get(OperationsReportUrlSearchParams.startDate)
  const endDateString = get(OperationsReportUrlSearchParams.endDate)

  const fromDate = startDateString
    ? DateHelper.toDate(DateHelper.formatClientDateToServer(startDateString))
    : new Date()

  const toDate = endDateString
    ? DateHelper.toDate(DateHelper.formatClientDateToServer(endDateString))
    : new Date()

  return (
    <Styled.Root>
      <Typography variant="PBody">С</Typography>
      <DatePicker
        inputReadOnly
        inputFormat={DEFAULT_DATE_FORMAT}
        maxDate={toDate}
        placeholder={DEFAULT_DATE_FORMAT}
        size="flex"
        value={fromDate}
        views={['month', 'day']}
        onChange={handleChangeStartDate}
      />
      <Typography variant="PBody">По</Typography>
      <DatePicker
        inputReadOnly
        inputFormat={DEFAULT_DATE_FORMAT}
        minDate={fromDate}
        placeholder={DEFAULT_DATE_FORMAT}
        size="flex"
        value={toDate}
        views={['month', 'day']}
        onChange={handleChangeEndDate}
      />
    </Styled.Root>
  )
}
