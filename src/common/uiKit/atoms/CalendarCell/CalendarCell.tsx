import React from 'react'

import { centerTextCSS } from '@common/common.styled'
import { NumberFormat } from '@common/newUi/NumberFormat'

import { theme } from '@providers/ThemeProvider/theme'

import { getWeekDays } from '@utils'

import { Typography } from '../../components/Typography'
import { Root } from './CaelndarCell.styled'
import * as T from './CalendarCell.types'

export const CalendarCell: React.FC<T.Props> = ({ day, index }) => (
  <Root>
    {day?.dayNumber && (
      <>
        <Typography
          color={theme.colors.asphalt}
          css={centerTextCSS}
          variant="Small">
          {getWeekDays('ru')[index]}
        </Typography>
        <Typography
          color={day?.money ? theme.colors.black : theme.colors.asphalt}
          css={centerTextCSS}
          variant="H4">
          {String(day?.dayNumber).padStart(2, '0')}
        </Typography>
        {day?.money && (
          <Typography
            color={theme.colors.black}
            css={centerTextCSS}
            variant="LabelBold">
            <NumberFormat suffix=" ₽" value={Number(day?.money).toFixed(0)} />
          </Typography>
        )}
        {day?.hours && (
          <Typography
            color={theme.colors.wetAsphalt}
            css={centerTextCSS}
            variant="Small">{`${day?.hours} ч.`}</Typography>
        )}
      </>
    )}
  </Root>
)
