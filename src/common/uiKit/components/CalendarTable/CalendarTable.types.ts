export type DailySalaryType = {
  id: number
  date: string
  money: string
  hours: string
}

export type DaysType = {
  id: number | string
  dayNumber: number | null
  money?: string
  hours?: string
}

export type Props = {
  yearMonth: string
  dailyShiftData?: DailySalaryType[]
}

export type RowProps = {
  days: Array<DaysType>
}
