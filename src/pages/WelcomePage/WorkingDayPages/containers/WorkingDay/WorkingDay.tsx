import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { AppLoader } from '@app/containers/AppLoader'

import { uuid } from '@common/helpers/uuid'
import { Nullable } from '@common/types/Nullable'

import { WorkingDayCalendar } from '@pages/WelcomePage/WorkingDayPages/components/WorkingDayCalendar/WorkingDayCalendar'

import {
  ShiftsStep,
  ShiftData as ShiftDataDto,
} from '@rtkApi/modules/__generated__/spot_config'

import { useSpotConfigurationCtx } from '../../../containers/SpotConfigurationCtx'
import { WorkingDayHeader } from '../../components/WorkingDayHeader'
import {
  WorkingDayPageProvider,
  WorkingDayShiftLayout,
  WorkingDayShiftsStep,
} from '../../components/WorkingDayPageCtx'
import { Styled } from './WorkingDay.styled'

export type ShiftDayType = 'weekdays' | 'weekends'
export type ShiftStandard = 'manual' | 'preset'

export type WorkingDayForm = {
  shiftStandard: ShiftStandard
  shiftDayType: ShiftDayType
}
const defaultValues: WorkingDayForm = {
  shiftStandard: 'manual',
  shiftDayType: 'weekdays',
}

const makeIds = (
  object?: Nullable<Record<string, ShiftDataDto[]>>,
): WorkingDayShiftLayout => {
  const emptyShiftLayout = {
    weekdays: [],
    weekends: [],
  }

  return object
    ? Object.entries(object).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value?.map((el) => ({ ...el, id: uuid() })) || [],
        }),
        emptyShiftLayout,
      )
    : emptyShiftLayout
}

export const WorkingDay: React.FC = () => {
  const { wizardContext, isLoading: isLoadingGetSpotData } =
    useSpotConfigurationCtx()
  const [shiftStepsValues, setShiftStepsValues] =
    useState<WorkingDayShiftsStep>({
      manual: {
        weekdays: [],
        weekends: [],
      },
      preset: {
        weekdays: [],
        weekends: [],
      },
    })

  const form = useForm<WorkingDayForm>({ defaultValues })
  const { reset } = form

  useEffect(() => {
    const { shiftsStep } = wizardContext || {}
    if (shiftsStep) {
      const { usePreset, manual, preset } = shiftsStep
      const newShiftsStep: WorkingDayShiftsStep = {
        usePreset,
        manual: makeIds(manual),
        preset: makeIds(preset),
      }

      setShiftStepsValues(newShiftsStep)
    }
  }, [wizardContext])

  useEffect(() => {
    if (wizardContext && Object.keys(wizardContext)?.length) {
      const { shiftsStep } = wizardContext
      const { usePreset } = shiftsStep as ShiftsStep
      reset({
        shiftStandard: usePreset ? 'preset' : 'manual',
        shiftDayType: 'weekdays' as ShiftDayType,
      })
    }
  }, [])

  return (
    <WorkingDayPageProvider
      value={{ ...form, shiftStepsValues, setShiftStepsValues }}>
      <WorkingDayHeader />
      {isLoadingGetSpotData ? (
        <Styled.Loader>
          <AppLoader />
        </Styled.Loader>
      ) : (
        <WorkingDayCalendar />
      )}
    </WorkingDayPageProvider>
  )
}
