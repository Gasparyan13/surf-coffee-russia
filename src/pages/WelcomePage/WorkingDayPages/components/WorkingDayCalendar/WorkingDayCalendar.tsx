import { Button, Grid } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import rfdc from 'rfdc'

import { Calendar } from '@app/containers'
import { CalendarOneDayChangeEvent } from '@app/containers/Calendar/containers/CalendarOneDayCtx'

import { heightInheritCSS } from '@common/common.styled'
import { Nullable } from '@common/types/Nullable'

import { SpotWizardContextUpdateDto } from '@rtkApi/modules/__generated__/spot_config'

import { useSpotConfigurationCtx } from '../../../containers/SpotConfigurationCtx'
import { getFormatShiftTimeValue } from '../../utils/getters'
import {
  useWorkingDayPageCtx,
  WorkingDayShiftData,
  WorkingDayShiftLayout,
} from '../WorkingDayPageCtx'
import {
  buttonStyleCSS,
  calendarGridCSS,
  Styled,
} from './WorkingDayCalendar.styled'

const clone = rfdc()

export const WorkingDayCalendar: React.FC = () => {
  const { wizardContext, onGoNext } = useSpotConfigurationCtx()
  const { shiftStepsValues, setShiftStepsValues, watch } =
    useWorkingDayPageCtx()
  const calendarRef = useRef<Nullable<HTMLDivElement>>(null)
  const [wasEdited, setWasEdited] = useState(false)

  const [hasScrolled, setHasScrolled] = useState(false)
  const shiftDayType = watch('shiftDayType')
  const shiftStandard = watch('shiftStandard')

  useEffect(() => {
    if (calendarRef?.current && !hasScrolled) {
      setHasScrolled(true)
      calendarRef?.current?.scrollTo({
        top: 1000,
        behavior: 'smooth',
      })
    }
  }, [hasScrolled])

  const deleteSavingIDs = useCallback(
    (object?: WorkingDayShiftLayout) =>
      object
        ? Object.entries(object)?.reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: value.map(({ id, ...el }) => el),
            }),
            {},
          )
        : undefined,
    [],
  )

  const handleGoNext = useCallback(() => {
    try {
      if (shiftStepsValues) {
        const { usePreset, preset, manual } = shiftStepsValues

        const patchData: SpotWizardContextUpdateDto = {
          ...wizardContext,
          shiftsStep: {
            usePreset,
            manual: deleteSavingIDs(manual),
            preset: deleteSavingIDs(preset),
          },
        }
        onGoNext({ ...clone(patchData), stepName: 'WORKING_HOURS' })
        toast.success('Смены успешно сохранены')
      }
    } catch (error) {
      console.log('error', error)
    }
  }, [deleteSavingIDs, onGoNext, shiftStepsValues, wizardContext])

  const handleCalendarChange = useCallback(
    (changeEvent: CalendarOneDayChangeEvent) => {
      const { action, ...updateData } = changeEvent

      const { start, end } = updateData
      if (action) setWasEdited(true)

      if (action === 'CREATE') {
        return setShiftStepsValues((prevValue) => ({
          ...prevValue,
          [shiftStandard]: {
            ...prevValue?.[shiftStandard],
            [shiftDayType]: [
              ...(prevValue?.[shiftStandard]?.[shiftDayType] || []),
              {
                ...updateData,
                start: getFormatShiftTimeValue(start),
                end: getFormatShiftTimeValue(end),
              },
            ],
          },
        }))
      }
      if (action === 'DELETE') {
        return setShiftStepsValues((prevValue) => {
          const prevArr = clone(
            prevValue?.[shiftStandard]?.[shiftDayType] || [],
          )

          const removeIndex = prevArr.findIndex(
            (item) => item.id === updateData.id,
          )

          prevArr.splice(removeIndex, 1)

          return {
            ...prevValue,
            [shiftStandard]: {
              ...prevValue?.[shiftStandard],
              [shiftDayType]: [...(prevArr || [])],
            },
          }
        })
      }
      if (action === 'UPDATE') {
        return setShiftStepsValues((prevValue) => {
          const updatedShifts = prevValue?.[shiftStandard]?.[
            shiftDayType
          ]?.reduce<WorkingDayShiftData[]>((acc, shift) => {
            if (shift.id === updateData.id) {
              return [
                ...acc,
                {
                  ...updateData,
                  start: getFormatShiftTimeValue(updateData.start),
                  end: getFormatShiftTimeValue(updateData.end),
                },
              ]
            }

            return [...acc, shift]
          }, [])

          return {
            ...prevValue,
            [shiftStandard]: {
              ...prevValue?.[shiftStandard],
              [shiftDayType]: updatedShifts,
            },
          }
        })
      }
    },
    [setShiftStepsValues, shiftDayType, shiftStandard],
  )

  const hasShiftStepsValues =
    shiftStepsValues?.manual?.weekdays?.length ||
    shiftStepsValues?.manual?.weekends?.length

  const isDisabledGoNextButton =
    shiftStandard === 'manual' && !wasEdited && !hasShiftStepsValues

  const calendarValue = useMemo(() => {
    if (shiftStepsValues) {
      return shiftStepsValues[shiftStandard]?.[shiftDayType]
    }
  }, [shiftDayType, shiftStandard, shiftStepsValues])

  return (
    <Styled.Root>
      <Grid container direction="column" justifyContent="space-between">
        <Grid item css={calendarGridCSS} xs={12}>
          <Calendar
            mode="ONE_DAY"
            value={calendarValue}
            onChange={handleCalendarChange}
          />
        </Grid>
        <Styled.Footer>
          <Grid
            container
            alignItems="center"
            css={heightInheritCSS}
            justifyContent="flex-end">
            <Grid item>
              <Button
                fullWidth
                color="primary"
                css={buttonStyleCSS}
                disabled={isDisabledGoNextButton}
                size="large"
                variant="contained"
                onClick={handleGoNext}>
                Сохранить
              </Button>
            </Grid>
          </Grid>
        </Styled.Footer>
      </Grid>
    </Styled.Root>
  )
}
