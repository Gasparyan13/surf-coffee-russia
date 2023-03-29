import React, { memo } from 'react'

import { DateHelper } from '@helpers'

import * as Styled from './ScheduleLayout.styled'
import * as T from './ScheduleLayout.types'
import { Table } from './components/Table'

export const ScheduleLayout: React.FC<T.Props> = memo(({ date, schedule }) => {
  const currentDate = DateHelper.toDate(date)
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  return (
    <Styled.Root>
      <Table month={currentMonth} schedule={schedule} year={currentYear} />
    </Styled.Root>
  )
})
