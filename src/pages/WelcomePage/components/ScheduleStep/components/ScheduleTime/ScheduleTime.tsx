import { Box, Grid } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { Button, SelectSingle } from '@uiKit'

import { getSchedulesTime } from '@pages/StaffPage/components/ScheduleLayout/components/DialogAddEmployeeShift/utils/getters'
import {
  ERROR_MESSAGE_SAVE_SPOT_SETTINGS,
  SUCCSESS_MESSAGE_SAVE_SPOT_SETTING,
} from '@pages/WelcomePage/components/SpotConfiguration/constants/messages'

import { usePatchControlPanelEnterprisesByIdNameMutation } from '@rtkApi/modules/enhancements/control_panel'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { useSpotConfigurationCtx } from '../../../../containers/SpotConfigurationCtx'
import { ScheduleTimeData } from '../../ScheduleStep.types'
import { buttonSaveCSS, formStyleTimeCSS, Styled } from './ScheduleTime.styled'
import * as T from './ScheduleTime.types'
import { getWorkingTimeSpot, times } from './constants/getters'

export const ScheduleTime: React.FC<T.Props> = ({
  control,
  dirtyFields,
  hoursWeekData,
  handleSubmit,
  watch,
  reset,
  isFormDirty,
  refetchName,
}) => {
  const { wizardContext, onGoNext } = useSpotConfigurationCtx()

  const startWeekDays = watch('workDayStart')
  const endWeekDays = watch('workDayEnd')
  const startWeekend = watch('weekEndStart')
  const endWeekend = watch('weekEndEnd')
  const projectName = watch('projectName')
  const id = useSelector(getManagerCurrentProjectId)

  const [apiUpdateProjectsName] =
    usePatchControlPanelEnterprisesByIdNameMutation()

  const startWeekDay = times.filter((a) => a < endWeekDays)
  const endWeekDay = times.filter((a) => a > startWeekDays)
  const startTimeWeekends = times.filter((a) => a < endWeekend)
  const endTimeWeekends = times.filter((a) => a > startWeekend)

  const handleCreateSchedule = handleSubmit(async (data: ScheduleTimeData) => {
    if (!isFormDirty) return

    reset({}, { keepValues: true })
    const { projectName: name } = dirtyFields

    try {
      if (name)
        await apiUpdateProjectsName({
          id: id as number,
          name: projectName as string,
        }).unwrap()
      refetchName()

      const { workDayStart, workDayEnd, weekEndStart, weekEndEnd } = data

      const otherDays = {
        workDayStart,
        workDayEnd,
        weekEndStart,
        weekEndEnd,
      }

      if (JSON.stringify(hoursWeekData) !== JSON.stringify(otherDays)) {
        onGoNext({ ...wizardContext, workingHoursStep: otherDays })
      }

      return toast.success(SUCCSESS_MESSAGE_SAVE_SPOT_SETTING)
    } catch (e) {
      toast.error(ERROR_MESSAGE_SAVE_SPOT_SETTINGS)
    }
  })

  return (
    <Styled.Root>
      <form onSubmit={handleCreateSchedule}>
        <Box css={formStyleTimeCSS}>
          <Box>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={12}>
                <Styled.TitleDay>Будни</Styled.TitleDay>
              </Grid>
              <Grid item xs={12}>
                <Styled.TitleShift>Открыто</Styled.TitleShift>
              </Grid>
              <Grid item xs={5.5}>
                <Controller
                  control={control}
                  name="workDayStart"
                  render={({ field: { value, onChange } }) => (
                    <SelectSingle
                      menus={getWorkingTimeSpot(startWeekDay)}
                      renderValue={(time) => `с️ ${time}`}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={5.5}>
                <Controller
                  control={control}
                  name="workDayEnd"
                  render={({ field: { value, onChange } }) => (
                    <SelectSingle
                      menus={getWorkingTimeSpot(endWeekDay)}
                      renderValue={(time) => `️до️ ${time}`}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={12}>
                <Styled.TitleDay>Выходные</Styled.TitleDay>
              </Grid>
              <Grid item xs={12}>
                <Styled.TitleShift>Открыто</Styled.TitleShift>
              </Grid>
              <Grid item xs={5.5}>
                <Controller
                  control={control}
                  name="weekEndStart"
                  render={({ field: { value, onChange } }) => (
                    <SelectSingle
                      menus={getSchedulesTime(startTimeWeekends)}
                      renderValue={(time) => `с️ ${time}`}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={5.5}>
                <Controller
                  control={control}
                  name="weekEndEnd"
                  render={({ field: { value, onChange } }) => (
                    <SelectSingle
                      menus={getSchedulesTime(endTimeWeekends)}
                      renderValue={(time) => `до️ ${time}`}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Button
          color="primary"
          css={buttonSaveCSS}
          variant="contained"
          onClick={handleCreateSchedule}>
          Сохранить
        </Button>
      </form>
    </Styled.Root>
  )
}
