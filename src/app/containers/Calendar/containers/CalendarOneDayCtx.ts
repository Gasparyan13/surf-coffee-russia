import { createCtx } from '@helpers/createCtx'

import { CalendarEventType } from '../components/types'

export type CalendarActionType = 'CREATE' | 'UPDATE' | 'DELETE'

export type CalendarOneDayChangeEvent = {
  action: CalendarActionType
  start: string | number
  end: string | number
} & Omit<CalendarEventType, 'start' | 'end' | 'title'>

export const [useCalendarOneDayCtx, CalendarOneDayProvider] = createCtx<{
  onChange: (arg: CalendarOneDayChangeEvent) => void
}>()
