import { Box, Grid, Typography } from '@mui/material'
import React, { useCallback } from 'react'

import { mt } from '@common/common.styled'
import { MuiPopover } from '@common/newUi/MuiPopover'
import {
  deleteButtonCSS,
  titleShiftCSS,
} from '@common/newUi/MuiPopover/PopoverShift.styled'
import { Nullable } from '@common/types/Nullable'

import { DateHelper } from '@helpers'

import { Confirm } from '@ui'

import { useCalendarOneDayCtx } from '../../containers/CalendarOneDayCtx'
import { formatCalendarDate } from '../../helpers/date'
import { timePickerCSS } from '../CalendarDayItem/CalendarDayItem.styled'
import { CalendarEventType } from '../types'

type Props = {
  onClose: React.MouseEventHandler<HTMLDivElement>
  anchorEl: Nullable<Element>
  open: boolean
  onDelete: () => void
} & CalendarEventType

export const ShiftPopover: React.FC<Props> = ({
  name,
  id,
  start,
  end,
  onDelete,
  anchorEl,
  onClose,
  open,
  segment,
}) => {
  const { onChange } = useCalendarOneDayCtx()

  const handleDeleteShift = useCallback(
    (shiftId: string) => {
      onChange({
        action: 'DELETE',
        id: shiftId.split(':')[0],
        start: formatCalendarDate(start),
        end: formatCalendarDate(end),
        segment,
        name,
      })
      onDelete()
    },
    [onChange, onDelete],
  )
  return (
    <MuiPopover anchorEl={anchorEl} open={open} title={name} onClose={onClose}>
      <Grid container justifyContent="space-between" spacing={2}>
        <Grid item xs={7}>
          <Typography css={titleShiftCSS}>Смена</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Название</Typography>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        columns={2}
        css={mt(18)}
        flexWrap="nowrap"
        justifyContent="space-between">
        <Grid item xs={7}>
          <Typography css={titleShiftCSS}>Часы работы:</Typography>
        </Grid>
        <Grid item display="flex" gap={0.3} xs={4}>
          <Typography css={timePickerCSS}>
            c {DateHelper.getTimeOfDay(`${start}`)}
          </Typography>
          <Typography css={timePickerCSS}>
            - {DateHelper.getTimeOfDay(`${end}`)}
          </Typography>
        </Grid>
      </Grid>
      <Confirm
        text="Вы действительно хотите удалить смену ?"
        onSuccess={() => handleDeleteShift(id)}>
        <Box css={deleteButtonCSS}>Удалить</Box>
      </Confirm>
    </MuiPopover>
  )
}
