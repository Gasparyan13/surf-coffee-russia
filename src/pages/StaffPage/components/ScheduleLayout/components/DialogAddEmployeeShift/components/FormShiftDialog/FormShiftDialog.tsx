import { Grid } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { PATHS } from '@constants'

import { DateHelper } from '@helpers'

import { useHandleRedirect } from '@hooks'

import { DatePicker, FormLabel, SelectSingle, Typography } from '@uiKit'

import {
  EnterpriseScheduleConfigForTimeSlotDto,
  EnterpriseWorkerViewDto,
  useGetEnterpriseWorkersQuery,
  useLazyGetEnterpriseScheduleTimeSlotConfigQuery,
} from '@rtkApi/modules/__generated__/enterprise'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { AllShifts } from '../../DialogAddEmployeeShift.types'
import {
  ERROR_MESSAGE_GET_TIMES_SLOT,
  ERROR_MESSAGE_GET_WORKERS,
  MESSAGES_FOR_ADDING_EMPLOYEE,
  MESSAGES_FOR_ADDING_SHIFT,
} from '../../constants/messages'
import { getEmployees, getTimeSlot } from '../../utils/getters'
import { FormDuty } from '../FormDuty/FormDuty'
import { dialogShiftLinkCSS } from './FormShiftDialog.styled'
import * as T from './FormShiftDialog.types'

export const FormShiftDialog: React.FC<T.Props> = ({
  watch,
  control,
  handleAddNewShift,
  setValue,
  onClose,
}) => {
  const enterpriseId = useSelector(getManagerCurrentProjectId)
  const handleRedirect = useHandleRedirect()
  const [selectedShiftDate, setSelectedShiftDate] = useState<Date>(new Date())

  const allShifts = watch('allShifts')
  const presetId = watch('presetId')

  const [
    apiGetTimeSlotConfig,
    { data: shiftData, isError: isErrorGetShiftData },
  ] = useLazyGetEnterpriseScheduleTimeSlotConfigQuery()

  const {
    data: workersData,
    isLoading: isLoadingGetWorkers,
    isError: isErrorGetWorkers,
  } = useGetEnterpriseWorkersQuery({
    enterpriseId: enterpriseId!,
  })

  const usedTimeSlot = useMemo(
    () => allShifts?.find((el) => el.id === presetId),
    [allShifts, presetId],
  )

  useEffect(() => {
    const getTimeSlotConfig = async () => {
      await apiGetTimeSlotConfig({ enterpriseId: enterpriseId! })
    }
    getTimeSlotConfig()
  }, [])

  const timeSlotData = (
    data: EnterpriseScheduleConfigForTimeSlotDto | undefined,
    value: Date,
  ) => {
    if (data?.presetShifts) {
      const {
        presetShifts: { weekdays, weekends },
      } = data
      setValue(
        'allShifts',
        ((DateHelper.isWeekend(value) ? weekends : weekdays) as AllShifts[]) ??
          [],
      )
    }
  }

  const handleChangeEmployeeValue =
    (onChange: ControllerRenderProps['onChange']) => (newValue: string) => {
      setValue('employee', Number(newValue))
      return onChange(newValue)
    }

  const handleChangeShiftValue =
    (onChange: ControllerRenderProps['onChange']) => (newValue: string) => {
      setValue('presetId', Number(newValue))
      return onChange(newValue)
    }

  const handleGoToConfigurationSpot = useCallback(() => {
    handleRedirect(PATHS.spotConfiguration)
  }, [handleRedirect])

  const handleGoToEmployeesList = useCallback(() => {
    handleRedirect(PATHS.staff.employeesList)
    onClose()
  }, [handleRedirect, onClose])

  const handleChangeShiftDate = useCallback<
    <F extends FieldValues>(
      onChange: ControllerRenderProps<FieldPath<F>>['onChange'],
    ) => (newValue: Date) => void
  >(
    (onChange) => (newValue: Date) => {
      timeSlotData(shiftData, newValue)
      setSelectedShiftDate(newValue)
      onChange(newValue)
    },
    [shiftData],
  )

  useEffect(
    () => setValue('presetId', getTimeSlot(allShifts)[0]?.value as number),
    [allShifts],
  )

  useEffect(() => {
    timeSlotData(shiftData, new Date())
  }, [shiftData])

  useEffect(() => {
    if (usedTimeSlot) {
      const { start, end } = usedTimeSlot
      setValue('shiftStart', start)
      setValue('shiftEnd', end)
    }
  }, [usedTimeSlot])

  useEffect(() => {
    if (isErrorGetShiftData) toast.error(ERROR_MESSAGE_GET_TIMES_SLOT)
  }, [isErrorGetShiftData])

  useEffect(() => {
    if (isErrorGetWorkers) toast.error(ERROR_MESSAGE_GET_WORKERS)
  }, [isErrorGetWorkers])

  return (
    <form onSubmit={handleAddNewShift}>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <FormLabel text="Дата">
            <Controller
              control={control}
              name="date"
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  disablePast
                  inputReadOnly
                  minDate={new Date()}
                  value={value}
                  views={['month', 'day']}
                  onChange={handleChangeShiftDate(onChange)}
                />
              )}
            />
          </FormLabel>
        </Grid>
        <Grid item xs={12}>
          <FormLabel text="Смены">
            <Controller
              control={control}
              name="presetId"
              render={({ field: { value, onChange } }) => (
                <SelectSingle
                  disabled={!allShifts.length}
                  menus={getTimeSlot(allShifts)}
                  name={`${PATHS.staff}.presetId`}
                  placeholder="Название смены"
                  value={value || ''}
                  onChange={handleChangeShiftValue(onChange)}
                />
              )}
            />
          </FormLabel>
        </Grid>
        {!allShifts?.length && (
          <Typography
            css={dialogShiftLinkCSS}
            variant="Small"
            onClick={handleGoToConfigurationSpot}>
            {MESSAGES_FOR_ADDING_SHIFT}
          </Typography>
        )}
        <Grid item xs={12}>
          <FormLabel text="Сотрудник">
            <Controller
              control={control}
              name="employee"
              render={({ field: { value, onChange } }) => (
                <SelectSingle
                  disabled={!workersData?.length}
                  menus={getEmployees(workersData as EnterpriseWorkerViewDto[])}
                  name={`${PATHS.staff}.employee`}
                  placeholder="Выберите из списка"
                  value={value || ''}
                  onChange={handleChangeEmployeeValue(onChange)}
                />
              )}
            />
          </FormLabel>
        </Grid>
        {!isLoadingGetWorkers && !workersData?.length && (
          <Typography
            css={dialogShiftLinkCSS}
            variant="Small"
            onClick={handleGoToEmployeesList}>
            {MESSAGES_FOR_ADDING_EMPLOYEE}
          </Typography>
        )}
      </Grid>
      <FormDuty
        control={control}
        selectedShiftDate={selectedShiftDate}
        setValue={setValue}
        shiftData={shiftData}
        watch={watch}
      />
    </form>
  )
}
