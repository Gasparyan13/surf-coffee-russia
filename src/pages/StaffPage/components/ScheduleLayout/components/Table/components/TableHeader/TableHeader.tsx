import React, { memo } from 'react'

import { theme } from '../../../../../../../../common/providers/ThemeProvider/theme'
import { Typography } from '../../../../../../../../common/uiKit'
import { CURRENT_DAY } from '../../constants/className'
import { TableCell } from '../TableCell'
import * as Styled from './TableHeader.styled'
import * as T from './TableHeader.types'

export const TableHeader: React.FC<T.Props> = memo(({ days }) => {
  return (
    <Styled.Header>
      <Styled.HeaderList>
        {days.map((day) => (
          <Styled.HeaderItem
            key={day.id}
            className={day.isCurrentDay ? CURRENT_DAY : ''}>
            <TableCell
              isCurrentDay={day.isCurrentDay}
              rowType="header"
              width={day.cellWidth}>
              <Typography color={theme.colors.asphalt} variant="Small">
                {day.dayName}
              </Typography>
              <Typography variant="H4">{day.dayNumber}</Typography>
            </TableCell>
          </Styled.HeaderItem>
        ))}
      </Styled.HeaderList>
    </Styled.Header>
  )
})
