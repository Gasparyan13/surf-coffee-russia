import { Grid, GridSize } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { pt } from '@common/common.styled'

import { DateHelper } from '@helpers'

import { FormLabel, SelectSingle } from '@uiKit'

import { useLazyGetEnterpriseScheduleHasDutyForDayQuery } from '@rtkApi/modules/__generated__/enterprise'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { ERROR_MESSAGE_GET_DUTY } from '../../constants/messages'
import { EDuty } from '../../types/enums'
import {
  getEndDailyShift,
  getSchedulesTime,
  getStartDailyShift,
} from '../../utils/getters'
import { CheckboxesDuty } from '../CheckboxesDuty/CheckboxesDuty'
import * as T from './FormDuty.types'

export const FormDuty: React.FC<T.Props> = ({
  control,
  watch,
  setValue,
  shiftData,
  selectedShiftDate,
}) => {
  const enterpriseId = useSelector(getManagerCurrentProjectId)
  const [hasOffMorningDuty, setHasOffMorningDuty] = useState(false)
  const [hasOffEveningDuty, setHasOffEveningDuty] = useState(false)
  const [hasDutyMorningAppointed, setHasDutyMorningAppointed] = useState(false)
  const [hasDutyEveningAppointed, setHasDutyEveningAppointed] = useState(false)

  const shiftStart = watch('shiftStart')
  const shiftEnd = watch('shiftEnd')
  const allShifts = watch('allShifts')
  const dutyMorning = watch('dutyMorning')
  const dutyEvening = watch('dutyEvening')

  const date = watch('date')

  const startDailyShift = getStartDailyShift(shiftEnd)
  const endDailyShift = getEndDailyShift(shiftStart)

  const [apiGetDutyForDay, { data: dutyData, isError: isErrorDutyData }] =
    useLazyGetEnterpriseScheduleHasDutyForDayQuery()

  useEffect(() => {
    apiGetDutyForDay({
      enterpriseId: enterpriseId!,
      date: DateHelper.toServerDateFormat(selectedShiftDate),
    })
  }, [apiGetDutyForDay, enterpriseId, selectedShiftDate])

  useEffect(() => {
    if (isErrorDutyData) toast.error(ERROR_MESSAGE_GET_DUTY)
  }, [isErrorDutyData])

  useEffect(() => {
    if (dutyData && shiftData?.workingHours) {
      const { hasMorningDuty, hasEveningDuty } = dutyData
      const {
        workingHours: { weekendStart, weekendEnd, workdayStart, workdayEnd },
      } = shiftData

      const isWeekend = DateHelper.isWeekend(date)
      const hasWorkDayMatchesStart = workdayStart === shiftStart
      const hasWorkDayMatchesEnd = workdayEnd === shiftEnd
      const hasWeekendStartMatchesStart = weekendStart === shiftStart
      const hasWeekendEndMatchesEnd = weekendEnd === shiftEnd

      setHasOffMorningDuty(
        isWeekend ? !hasWeekendStartMatchesStart : !hasWorkDayMatchesStart,
      )
      setHasOffEveningDuty(
        isWeekend ? !hasWeekendEndMatchesEnd : !hasWorkDayMatchesEnd,
      )

      setHasDutyMorningAppointed(!!hasMorningDuty)
      setHasDutyEveningAppointed(!!hasEveningDuty)
    }
  }, [dutyData, shiftData, shiftStart, shiftEnd, date])

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <Grid
          container
          alignItems="end"
          css={pt(20)}
          justifyContent="space-between">
          <Grid item xs={5.63 as GridSize}>
            <FormLabel text="Время работы">
              <Controller
                control={control}
                name="shiftStart"
                render={({ field: { value, onChange } }) => (
                  <SelectSingle
                    disabled={!allShifts.length || dutyMorning === EDuty.On}
                    // TODO uncomment next line when return "PATHS.staff.schedule"
                    // name={`${PATHS.staff.schedule}.shiftStart`}
                    menus={getSchedulesTime(startDailyShift)}
                    name="schedule.shiftStart"
                    renderValue={(time) => `с️ ${time}`}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </FormLabel>
          </Grid>
          <Grid item xs={5.63 as GridSize}>
            <Controller
              control={control}
              name="shiftEnd"
              render={({ field: { value, onChange } }) => (
                <SelectSingle
                  disabled={!allShifts.length || dutyEvening === EDuty.On}
                  // TODO uncomment next line when return "PATHS.staff.schedule"
                  // name={`${PATHS.staff.schedule}.shiftEnd`}
                  menus={getSchedulesTime(endDailyShift)}
                  name="schedule.shiftEnd"
                  renderValue={(time) => `до  ${time}`}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
      <CheckboxesDuty
        control={control}
        hasDutyEveningAppointed={hasDutyEveningAppointed}
        hasDutyMorningAppointed={hasDutyMorningAppointed}
        hasOffEveningDuty={hasOffEveningDuty}
        hasOffMorningDuty={hasOffMorningDuty}
        setValue={setValue}
        watch={watch}
      />
    </Grid>
  )
}
