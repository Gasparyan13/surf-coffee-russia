import { yupResolver } from '@hookform/resolvers/yup'
import {
  CircularProgress,
  FormHelperText,
  Grid,
  TextField,
} from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { centerTextCSS, mb, ml, mt } from '@common/common.styled'
import { PATHS } from '@common/constants'

import { theme } from '@providers/ThemeProvider/theme'

import { Button, Typography } from '@uiKit'

import { WorkingHoursStep } from '@rtkApi/modules/__generated__/spot_config'
import { useGetControlPanelEnterprisesByIdNameQuery } from '@rtkApi/modules/enhancements/control_panel'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { useSpotConfigurationCtx } from '../../containers/SpotConfigurationCtx'
import { WorkingHoursHeader } from '../WorkingHoursHeader'
import { buttonShiftsCSS, Styled } from './ScheduleStep.styled'
import { HoursStepData, ScheduleTimeData } from './ScheduleStep.types'
import { ScheduleTime } from './components/ScheduleTime'
import { defaultValues, schema } from './constants/form'

export const ScheduleStep: React.FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, dirtyFields, isDirty },
  } = useForm<ScheduleTimeData>({
    defaultValues,
    resolver: yupResolver(schema),
  })

  const id = useSelector(getManagerCurrentProjectId) as number
  const { wizardContext, onGoNext, isLoading } = useSpotConfigurationCtx()
  const [hoursWeekData, setHoursWeekData] = useState<HoursStepData | null>(null)

  const { data: projectName, refetch: refetchProjectName } =
    useGetControlPanelEnterprisesByIdNameQuery({ id })

  useEffect(() => {
    if (projectName) setValue('projectName', projectName)
  }, [projectName])

  useEffect(() => {
    const { workingHoursStep } = wizardContext

    const { weekEndEnd, weekEndStart, workDayEnd, workDayStart } =
      workingHoursStep as WorkingHoursStep

    const beforeHoursStep = {
      workDayStart,
      workDayEnd,
      weekEndStart,
      weekEndEnd,
    }

    setHoursWeekData(beforeHoursStep as HoursStepData)
    setValue('weekEndEnd', weekEndEnd as string)
    setValue('weekEndStart', weekEndStart as string)
    setValue('workDayEnd', workDayEnd as string)
    setValue('workDayStart', workDayStart as string)
  }, [wizardContext])

  const handleOpenShifts = useCallback(() => {
    return onGoNext({ ...wizardContext, stepName: 'SHIFTS' })
  }, [])

  return (
    <Styled.Root>
      <WorkingHoursHeader />
      <Grid container css={mt(32)} gap={3.75}>
        <Styled.WorkingDay>
          <Styled.WorkingDayTitle>Название спота</Styled.WorkingDayTitle>
          <Controller
            control={control}
            name="projectName"
            render={({ field: { value, onChange } }) => (
              <>
                <TextField
                  fullWidth
                  error={!!errors?.projectName}
                  inputProps={{
                    autoComplete: 'off',
                    maxLength: 50,
                    placeholder: 'Например, Surf Coffee',
                  }}
                  name={`${PATHS.spotConfiguration}.projectName`}
                  type="text"
                  value={value}
                  variant="outlined"
                  onChange={onChange}
                />
                {errors?.projectName && (
                  <FormHelperText css={ml(14)}>
                    Нет названия спота
                  </FormHelperText>
                )}
              </>
            )}
          />
          <Styled.WorkingDayTitle css={[mt(24), mb(-24)]}>
            График работы
          </Styled.WorkingDayTitle>
          <ScheduleTime
            control={control}
            dirtyFields={dirtyFields}
            errors={errors}
            handleSubmit={handleSubmit}
            hoursWeekData={hoursWeekData}
            isFormDirty={isDirty}
            refetchName={refetchProjectName}
            reset={reset}
            setValue={setValue}
            watch={watch}
          />
        </Styled.WorkingDay>
        <Styled.Shifts>
          <Grid
            container
            gap={isLoading ? 28 : 62}
            justifyContent="space-between">
            <Grid item xs={12}>
              <Typography variant="H3">Укажи смены работы персонала</Typography>
              <Typography color={theme.colors.asphalt} variant="PBody">
                Используй рекомендации или сделай свои.
              </Typography>
            </Grid>
            {isLoading && (
              <Grid item css={centerTextCSS} xs={12}>
                <CircularProgress />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                color="primary"
                css={buttonShiftsCSS}
                disabled={isLoading}
                variant="contained"
                onClick={handleOpenShifts}>
                Указать
              </Button>
            </Grid>
          </Grid>
        </Styled.Shifts>
      </Grid>
    </Styled.Root>
  )
}
