import { makeNumberedArray } from '@helpers'

export const times = makeNumberedArray(24)
  .map((hour) => [
    `${String(hour).padStart(2, '0')}:00`,
    `${String(hour).padStart(2, '0')}:30`,
  ])
  .flat()

export const getWorkingTimeSpot = (options: string[]) =>
  options?.map((option, index: number) => ({
    key: index,
    value: option,
    text: option,
  })) ?? []
