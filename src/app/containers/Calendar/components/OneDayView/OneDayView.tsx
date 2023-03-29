import { Grid } from '@mui/material'
import React, { useCallback, useMemo, useState } from 'react'

import { allHoursDay } from '@common/constants/hours'

import {
  useWorkingDayPageCtx,
  WorkingDayShiftData,
} from '@pages/WelcomePage/WorkingDayPages/components/WorkingDayPageCtx'

import {
  CalendarOneDayChangeEvent,
  CalendarOneDayProvider,
} from '../../containers/CalendarOneDayCtx'
import { parseCalendarDate } from '../../helpers/date'
import { CalendarDayItem } from '../CalendarDayItem'
import { CalendarEventType } from '../types'
import { Styled } from './OneDayView.styled'

type Props = {
  value?: WorkingDayShiftData[]
  onChange: (arg: CalendarOneDayChangeEvent) => void
}

export const OneDayView: React.FC<Props> = ({ value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false)
  const { watch } = useWorkingDayPageCtx()
  const shiftDayType = watch('shiftDayType')

  const columns: Record<number, CalendarEventType[]> = useMemo(
    () =>
      (value || []).reduce(
        (acc, current: WorkingDayShiftData) => ({
          ...(acc || []),
          [current.segment!]: [
            ...(acc[current.segment!] || []),
            {
              title: current.name,
              start: parseCalendarDate(current.start!),
              end: parseCalendarDate(current.end!),
              name: current.name,
              id: current.id!,
              segment: current.segment,
            },
          ],
        }),
        { 1: [], 2: [], 3: [], 4: [] } as Record<number, CalendarEventType[]>,
      ),
    [value],
  )

  const handleRootRefAppear = useCallback((ref: HTMLDivElement | null) => {
    ref?.scrollTo({ top: 480, behavior: 'smooth' })
  }, [])

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
  }, [setIsDragging])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
  }, [setIsDragging])

  return (
    <CalendarOneDayProvider value={{ onChange }}>
      <Styled.Root ref={handleRootRefAppear}>
        <Grid container spacing={2}>
          <Grid item>
            <Styled.HoursBlock>
              {allHoursDay.map((hour) => (
                <Styled.Hour key={hour}>{hour}:00</Styled.Hour>
              ))}
            </Styled.HoursBlock>
          </Grid>
          <Grid item>
            <Grid container>
              {columns &&
                Object.entries(columns)?.map(([columnNumber, events]) => (
                  <Grid key={columnNumber + shiftDayType} item xs={3}>
                    <CalendarDayItem
                      allowOverlap
                      events={events}
                      isAddingDisabled={isDragging}
                      segment={Number(columnNumber)}
                      onDragEnd={handleDragEnd}
                      onDragStart={handleDragStart}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Styled.Root>
    </CalendarOneDayProvider>
  )
}
