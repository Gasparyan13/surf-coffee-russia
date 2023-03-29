import React, { memo } from 'react'

import { allHoursDay } from '../../../../../../../../common/constants/hours'
import { theme } from '../../../../../../../../common/providers/ThemeProvider/theme'
import { Typography } from '../../../../../../../../common/uiKit'
import { TIME_CELL_WIDTH } from '../../constants/size'
import { TableCell } from '../TableCell'
import * as Styled from './TableTimeColumn.styled'

export const TableTimeColumn: React.FC = memo(() => {
  return (
    <Styled.TimeColumn>
      <Styled.TimeList>
        {allHoursDay.map((hour, index, array) => (
          <Styled.TimeItem key={hour}>
            <TableCell rowType="time" width={TIME_CELL_WIDTH}>
              {index !== 0 && index !== array.length && (
                <Styled.TimeSpan>
                  <Typography
                    color={theme.colors.wetAsphalt}
                    variant="SUBTextLight">
                    {hour}:00
                  </Typography>
                </Styled.TimeSpan>
              )}
            </TableCell>
          </Styled.TimeItem>
        ))}
      </Styled.TimeList>
    </Styled.TimeColumn>
  )
})
