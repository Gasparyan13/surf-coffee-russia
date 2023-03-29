import { makeNumberedArray } from '../helpers'

export const allHoursDay = makeNumberedArray(24).map((el) =>
  String(el).padStart(2, '0'),
)

export const allHalfHoursDay = makeNumberedArray(24)
  .map((hour) => [
    `${String(hour).padStart(2, '0')}:00`,
    `${String(hour).padStart(2, '0')}:30`,
  ])
  .flat()
