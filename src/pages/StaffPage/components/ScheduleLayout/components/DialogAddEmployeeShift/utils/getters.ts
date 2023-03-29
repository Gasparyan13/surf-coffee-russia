import { allHalfHoursDay } from '@common/constants/hours'

import { Props as ListRowProps } from '@uiKit/components/ListRow/ListRow.types'

import { EnterpriseWorkerViewDto } from '@rtkApi/modules/__generated__/enterprise'

import { AllShifts } from '../DialogAddEmployeeShift.types'

export const getStartDailyShift = (end: string) =>
  allHalfHoursDay.filter((a) => a < end)

export const getEndDailyShift = (start: string) =>
  allHalfHoursDay.filter((a) => a > start)

export const getSchedulesTime = (options: string[]): ListRowProps[] =>
  options?.map((option, index: number) => ({
    key: index,
    value: option,
    text: option,
  })) ?? []

export const getTimeSlot = (options: AllShifts[]): ListRowProps[] =>
  options.map(({ id, name }) => ({
    key: id!,
    value: id!,
    text: name!,
  }))

export const getEmployees = (
  options: EnterpriseWorkerViewDto[],
): ListRowProps[] =>
  options?.map((option) => ({
    key: option?.id as number,
    value: option?.id as number,
    text: option?.firstAndLastName,
  }))

export const getDutyTimeIndex = (times: string[], workingHours: string) =>
  getSchedulesTime(times).findIndex((time) => time.value === workingHours)
