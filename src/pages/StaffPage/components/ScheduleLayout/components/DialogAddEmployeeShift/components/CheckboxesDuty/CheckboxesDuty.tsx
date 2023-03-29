import { Grid } from '@mui/material'
import React, { useCallback } from 'react'
import {
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form'

import { centerTextCSS, displayBlockCSS, ml, p } from '@common/common.styled'

import { theme } from '@providers/ThemeProvider/theme'

import { Checkbox, Typography } from '@uiKit'

import { EDuty } from '../../types/enums'
import {
  getDutyTimeIndex,
  getEndDailyShift,
  getSchedulesTime,
  getStartDailyShift,
} from '../../utils/getters'
import * as T from './CheckboxesDuty.types'

export const CheckboxesDuty: React.FC<T.Props> = ({
  control,
  setValue,
  watch,
  hasOffMorningDuty,
  hasOffEveningDuty,
  hasDutyMorningAppointed,
  hasDutyEveningAppointed,
}) => {
  const shiftStart = watch('shiftStart')
  const shiftEnd = watch('shiftEnd')
  const dutyMorning = watch('dutyMorning')
  const dutyEvening = watch('dutyEvening')

  const startDailyShift = getStartDailyShift(shiftEnd)
  const endDailyShift = getEndDailyShift(shiftStart)

  const handleChooseDutyMorning = useCallback<
    <F extends FieldValues>(
      onChange: ControllerRenderProps<FieldPath<F>>['onChange'],
      value: EDuty,
    ) => (newValue: React.FormEvent<HTMLInputElement>) => void
  >(
    (onChange, value) => (newValue: React.FormEvent<HTMLInputElement>) => {
      const morningDutyTimeIndex = getDutyTimeIndex(startDailyShift, shiftStart)

      setValue(
        'shiftStart',
        getSchedulesTime(startDailyShift)[
          morningDutyTimeIndex + (value ? 1 : -1)
        ].value as string,
      )

      onChange(newValue)
    },
    [setValue, shiftStart, startDailyShift],
  )

  const handleChooseDutyEvening = useCallback<
    <F extends FieldValues>(
      onChange: ControllerRenderProps<FieldPath<F>>['onChange'],
      value: EDuty,
    ) => (newValue: React.FormEvent<HTMLInputElement>) => void
  >(
    (onChange, value) => (newValue: React.FormEvent<HTMLInputElement>) => {
      const eveningTimeIndex = getDutyTimeIndex(endDailyShift, shiftEnd)

      setValue(
        'shiftEnd',
        getSchedulesTime(endDailyShift)[eveningTimeIndex + (value ? -1 : 1)]
          .value as string,
      )

      onChange(newValue)
    },
    [endDailyShift, setValue, shiftEnd],
  )

  const isDutyAlreadyAssigned =
    hasDutyEveningAppointed && hasDutyMorningAppointed
  const isDutyNotAssigned =
    shiftStart &&
    shiftEnd &&
    ((!dutyMorning && !hasOffMorningDuty && !hasDutyMorningAppointed) ||
      (!dutyEvening && !hasOffEveningDuty && !hasDutyEveningAppointed))

  return (
    <>
      <Grid item xs={12}>
        <Grid container css={p(4)} gap={8.5}>
          <Grid item>
            <Controller
              control={control}
              name="dutyMorning"
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  css={ml(2)}
                  disabled={
                    (!value && hasOffMorningDuty) || hasDutyMorningAppointed
                  }
                  label="Дежурный с утра"
                  // TODO uncomment next line when return "PATHS.staff.schedule"
                  // name={`${PATHS.staff.schedule}.dutyMorning`}
                  name="schedule.dutyMorning"
                  value={value}
                  onChange={handleChooseDutyMorning(onChange, value)}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="dutyEvening"
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  css={ml(2)}
                  disabled={
                    (!value && hasOffEveningDuty) || hasDutyEveningAppointed
                  }
                  label="Дежурный вечером"
                  // TODO uncomment next line when return "PATHS.staff.schedule"
                  // name={`${PATHS.staff.schedule}.dutyEvening`}
                  name="schedule.dutyEvening"
                  value={value}
                  onChange={handleChooseDutyEvening(onChange, value)}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
      {isDutyAlreadyAssigned && (
        <Grid item xs={12}>
          <Typography
            color={theme.colors.critical}
            css={[centerTextCSS, displayBlockCSS]}
            variant="PBody">
            Дежурный уже назначен!
          </Typography>
        </Grid>
      )}
      {isDutyNotAssigned && (
        <Grid item xs={12}>
          <Typography
            color={theme.colors.critical}
            css={[centerTextCSS, displayBlockCSS]}
            variant="PBody">
            Не задан сотрудник на дежурство
          </Typography>
        </Grid>
      )}
    </>
  )
}
