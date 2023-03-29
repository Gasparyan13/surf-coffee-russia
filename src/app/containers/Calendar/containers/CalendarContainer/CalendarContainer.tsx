import React from 'react'

import { WorkingDayShiftData } from '@pages/WelcomePage/WorkingDayPages/components/WorkingDayPageCtx'

import { OneDayView } from '../../components'
import { CalendarOneDayChangeEvent } from '../CalendarOneDayCtx'

export type CalendarMode = 'ONE_DAY'

type Props<T> = {
  mode: T
} & (T extends 'ONE_DAY'
  ? {
      onChange: (arg: CalendarOneDayChangeEvent) => void
      value?: WorkingDayShiftData[]
    }
  : Record<string, never>)

export const CalendarContainer = <T extends CalendarMode>({
  mode,
  onChange,
  value,
}: React.PropsWithChildren<Props<T>>) => {
  if (mode === 'ONE_DAY')
    return <OneDayView value={value} onChange={onChange} />
  return null
}
