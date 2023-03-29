import { emptySplitApi as api } from '../../core/emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEnterpriseWorkers: build.query<
      GetEnterpriseWorkersApiResponse,
      GetEnterpriseWorkersApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprise/workers`,
        params: { enterpriseId: queryArg.enterpriseId },
      }),
    }),
    postEnterpriseWorkers: build.mutation<
      PostEnterpriseWorkersApiResponse,
      PostEnterpriseWorkersApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprise/workers`,
        method: 'POST',
        body: queryArg.enterpriseWorkerCreateDto,
      }),
    }),
    patchEnterpriseWorkers: build.mutation<
      PatchEnterpriseWorkersApiResponse,
      PatchEnterpriseWorkersApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprise/workers`,
        method: 'PATCH',
        body: queryArg.enterpriseWorkerUpdateDto,
      }),
    }),
    getEnterpriseRoles: build.query<
      GetEnterpriseRolesApiResponse,
      GetEnterpriseRolesApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprise_roles`,
        params: { employeeId: queryArg.employeeId },
      }),
    }),
    getEnterpriseWorkersById: build.query<
      GetEnterpriseWorkersByIdApiResponse,
      GetEnterpriseWorkersByIdApiArg
    >({
      query: (queryArg) => ({ url: `/enterprise/workers/${queryArg.id}` }),
    }),
    deleteEnterpriseWorkersById: build.mutation<
      DeleteEnterpriseWorkersByIdApiResponse,
      DeleteEnterpriseWorkersByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprise/workers/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    getEnterpriseSchedule: build.query<
      GetEnterpriseScheduleApiResponse,
      GetEnterpriseScheduleApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprise/schedule`,
        params: {
          enterpriseId: queryArg.enterpriseId,
          yearMonth: queryArg.yearMonth,
          timeZoneId: queryArg.timeZoneId,
        },
      }),
    }),
    getEnterpriseScheduleTimeSlotConfig: build.query<
      GetEnterpriseScheduleTimeSlotConfigApiResponse,
      GetEnterpriseScheduleTimeSlotConfigApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprise/schedule/time_slot_config`,
        params: { enterpriseId: queryArg.enterpriseId },
      }),
    }),
    getEnterpriseScheduleHasDutyForDay: build.query<
      GetEnterpriseScheduleHasDutyForDayApiResponse,
      GetEnterpriseScheduleHasDutyForDayApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprise/schedule/has_duty_for_day`,
        params: { enterpriseId: queryArg.enterpriseId, date: queryArg.date },
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type GetEnterpriseWorkersApiResponse =
  /** status 200 Сотрудники успешно экспортированы. */ EnterpriseWorkerViewDto[]
export type GetEnterpriseWorkersApiArg = {
  /** id предприятия */
  enterpriseId: number
}
export type PostEnterpriseWorkersApiResponse =
  /** status 200 Успешно. */ Response
export type PostEnterpriseWorkersApiArg = {
  enterpriseWorkerCreateDto: EnterpriseWorkerCreateDto
}
export type PatchEnterpriseWorkersApiResponse =
  /** status 200 Успешно. */ Response
export type PatchEnterpriseWorkersApiArg = {
  enterpriseWorkerUpdateDto: EnterpriseWorkerUpdateDto
}
export type GetEnterpriseRolesApiResponse =
  /** status 200 Успешно. */ EnterprisesPerRoleViewDto
export type GetEnterpriseRolesApiArg = {
  /** id пользователя */
  employeeId: number
}
export type GetEnterpriseWorkersByIdApiResponse =
  /** status 200 Сотрудник успешно экспортирован. */ EnterpriseWorkerViewDto
export type GetEnterpriseWorkersByIdApiArg = {
  /** id сотрудника */
  id: number
}
export type DeleteEnterpriseWorkersByIdApiResponse =
  /** status 200 Сотрудник удален. */ string
export type DeleteEnterpriseWorkersByIdApiArg = {
  /** id сотрудника */
  id: number
}
export type GetEnterpriseScheduleApiResponse =
  /** status 200 Получен график работы предприятия за месяц */ EnterpriseScheduleForMonthViewDto
export type GetEnterpriseScheduleApiArg = {
  /** id предприятия */
  enterpriseId: number
  /** период (год и месяц) */
  yearMonth: string
  /** часовой пояс или смещение часового пояса от Гринвича/UTC */
  timeZoneId?: any
}
export type GetEnterpriseScheduleTimeSlotConfigApiResponse =
  /** status 200 Получена конфигурация */ EnterpriseScheduleConfigForTimeSlotDto
export type GetEnterpriseScheduleTimeSlotConfigApiArg = {
  /** id предприятия */
  enterpriseId: number
}
export type GetEnterpriseScheduleHasDutyForDayApiResponse =
  /** status 200 Успешно. */ HasDutyForDayDto
export type GetEnterpriseScheduleHasDutyForDayApiArg = {
  /** id предприятия */
  enterpriseId: number
  /** день для проверки */
  date: string
}
export type EnterpriseWorkerViewDto = {
  id?: number
  firstAndLastName?: string
  email?: string
  roleName?: string
  enterpriseName?: string
  payRate?: number
}
export type Response = {
  message?: string
  entityId?: number
}
export type EnterpriseWorkerCreateDto = {
  firstAndLastName: string
  email: string
  payRate: number
  enterpriseId: number
  roleId: number
}
export type EnterpriseWorkerUpdateDto = {
  id: number
  firstAndLastName: string
  payRate: number
}
export type EnterprisesPerRoleViewDto = {
  barista?: number[]
  manager?: number[]
}
export type ShiftWorkerSlotViewDto = {
  workerId?: number
  firstAndLastName?: string
  role?: string
  timeSlotId?: number
  startTime?: string
  endTime?: string
  plannedHours?: number
  onMorningDuty?: boolean
  onEveningDuty?: boolean
  morningDutyRequired?: boolean
  eveningDutyRequired?: boolean
}
export type EnterpriseScheduleForDayViewDto = {
  day?: number
  shiftsWorkersSlots?: ShiftWorkerSlotViewDto[]
}
export type EnterpriseScheduleForMonthViewDto = {
  data?: EnterpriseScheduleForDayViewDto[]
}
export type SpotWorkingHoursViewDto = {
  workdayStart?: string
  workdayEnd?: string
  weekendStart?: string
  weekendEnd?: string
}
export type PresetShiftViewDto = {
  id?: number
  name?: string
  start?: string
  end?: string
}
export type EnterprisePresetShiftsViewDto = {
  weekdays?: PresetShiftViewDto[]
  weekends?: PresetShiftViewDto[]
}
export type EnterpriseScheduleConfigForTimeSlotDto = {
  workingHours?: SpotWorkingHoursViewDto
  presetShifts?: EnterprisePresetShiftsViewDto
}
export type HasDutyForDayDto = {
  hasMorningDuty?: boolean
  hasEveningDuty?: boolean
}
export const {
  useGetEnterpriseWorkersQuery,
  useLazyGetEnterpriseWorkersQuery,
  usePostEnterpriseWorkersMutation,
  usePatchEnterpriseWorkersMutation,
  useGetEnterpriseRolesQuery,
  useLazyGetEnterpriseRolesQuery,
  useGetEnterpriseWorkersByIdQuery,
  useLazyGetEnterpriseWorkersByIdQuery,
  useDeleteEnterpriseWorkersByIdMutation,
  useGetEnterpriseScheduleQuery,
  useLazyGetEnterpriseScheduleQuery,
  useGetEnterpriseScheduleTimeSlotConfigQuery,
  useLazyGetEnterpriseScheduleTimeSlotConfigQuery,
  useGetEnterpriseScheduleHasDutyForDayQuery,
  useLazyGetEnterpriseScheduleHasDutyForDayQuery,
} = injectedRtkApi
