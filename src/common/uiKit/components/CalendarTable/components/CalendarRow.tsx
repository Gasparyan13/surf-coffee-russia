import React from 'react'

import { CalendarCell } from '../../../atoms/CalendarCell/CalendarCell'
import { RowProps } from '../CalendarTable.types'
import { Root } from './CalendarRow.styled'

export const CalendarRow: React.FC<RowProps> = ({ days }) => {
  return (
    <Root>
      {days.map((day, i) => {
        return <CalendarCell key={day.id} day={day} index={i} />
      })}
    </Root>
  )
}
