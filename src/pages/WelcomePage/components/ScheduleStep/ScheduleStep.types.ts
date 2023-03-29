export type ScheduleTimeData = {
  allDayStart: string
  allDayEnd: string
  weekEndStart: string
  weekEndEnd: string
  workDayStart: string
  workDayEnd: string
  projectName?: string
}

export type HoursStepData = {
  workDayStart: string
  workDayEnd: string
  weekEndStart: string
  weekEndEnd: string
}
