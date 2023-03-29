import { emptySplitApi as api } from '../../core/emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postTimetablePlannedSlots: build.mutation<
      PostTimetablePlannedSlotsApiResponse,
      PostTimetablePlannedSlotsApiArg
    >({
      query: (queryArg) => ({
        url: `/timetable/planned_slots`,
        method: 'POST',
        body: queryArg.plannedTimeSlotCreateDto,
      }),
    }),
    getTimetablePlannedSlotsSearchByWorker: build.query<
      GetTimetablePlannedSlotsSearchByWorkerApiResponse,
      GetTimetablePlannedSlotsSearchByWorkerApiArg
    >({
      query: (queryArg) => ({
        url: `/timetable/planned_slots/search/by_worker`,
        params: {
          workerId: queryArg.workerId,
          start: queryArg.start,
          end: queryArg.end,
        },
      }),
    }),
    getTimetablePlannedSlotsSearchByEnterprise: build.query<
      GetTimetablePlannedSlotsSearchByEnterpriseApiResponse,
      GetTimetablePlannedSlotsSearchByEnterpriseApiArg
    >({
      query: (queryArg) => ({
        url: `/timetable/planned_slots/search/by_enterprise`,
        params: { enterpriseId: queryArg.enterpriseId },
      }),
    }),
    getTimetablePlannedSlotsSearchByEmployee: build.query<
      GetTimetablePlannedSlotsSearchByEmployeeApiResponse,
      GetTimetablePlannedSlotsSearchByEmployeeApiArg
    >({
      query: (queryArg) => ({
        url: `/timetable/planned_slots/search/by_employee`,
        params: { employeeId: queryArg.employeeId },
      }),
    }),
    getTimetableActualSlotsById: build.query<
      GetTimetableActualSlotsByIdApiResponse,
      GetTimetableActualSlotsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/timetable/actual_slots/${queryArg.id}` }),
    }),
    deleteTimetableActualSlotsById: build.mutation<
      DeleteTimetableActualSlotsByIdApiResponse,
      DeleteTimetableActualSlotsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/timetable/actual_slots/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type PostTimetablePlannedSlotsApiResponse =
  /** status 200 Плановый слот добавлен. */ Response
export type PostTimetablePlannedSlotsApiArg = {
  plannedTimeSlotCreateDto: PlannedTimeSlotCreateDto
}
export type GetTimetablePlannedSlotsSearchByWorkerApiResponse =
  /** status 200 Получены плановые слоты по заданному id сотрудника и интервалу времени */ PlannedTimeSlotViewDto[]
export type GetTimetablePlannedSlotsSearchByWorkerApiArg = {
  workerId: number
  start?: string
  end?: string
}
export type GetTimetablePlannedSlotsSearchByEnterpriseApiResponse =
  /** status 200 Получены плановые слоты по заданному id предприятия */ PlannedTimeSlotViewDto[]
export type GetTimetablePlannedSlotsSearchByEnterpriseApiArg = {
  enterpriseId: number
}
export type GetTimetablePlannedSlotsSearchByEmployeeApiResponse =
  /** status 200 Получены плановые слоты по заданному id пользователя */ PlannedTimeSlotViewDto[]
export type GetTimetablePlannedSlotsSearchByEmployeeApiArg = {
  employeeId: number
}
export type GetTimetableActualSlotsByIdApiResponse =
  /** status 200 Успешно. */ ActualTimeSlotViewDto
export type GetTimetableActualSlotsByIdApiArg = {
  id: number
}
export type DeleteTimetableActualSlotsByIdApiResponse =
  /** status 200 Успешно. */ string
export type DeleteTimetableActualSlotsByIdApiArg = {
  id: number
}
export type Response = {
  message?: string
  entityId?: number
}
export type PlannedTimeSlotCreateDto = {
  workerId?: number
  managerId?: number
  start?: string
  end?: string
  onMorningDuty?: boolean
  onEveningDuty?: boolean
}
export type PlannedTimeSlotViewDto = {
  id?: number
  workerId?: number
  managerId?: number
  fullName?: string
  start?: string
  end?: string
  onMorningDuty?: boolean
  onEveningDuty?: boolean
}
export type ActualTimeSlotViewDto = {
  id?: number
  workerId?: number
  managerId?: number
  firstName?: string
  enterpriseDisplayName?: string
  start?: string
  end?: string
  onMorningDuty?: boolean
  onEveningDuty?: boolean
}
export const {
  usePostTimetablePlannedSlotsMutation,
  useGetTimetablePlannedSlotsSearchByWorkerQuery,
  useLazyGetTimetablePlannedSlotsSearchByWorkerQuery,
  useGetTimetablePlannedSlotsSearchByEnterpriseQuery,
  useLazyGetTimetablePlannedSlotsSearchByEnterpriseQuery,
  useGetTimetablePlannedSlotsSearchByEmployeeQuery,
  useLazyGetTimetablePlannedSlotsSearchByEmployeeQuery,
  useGetTimetableActualSlotsByIdQuery,
  useLazyGetTimetableActualSlotsByIdQuery,
  useDeleteTimetableActualSlotsByIdMutation,
} = injectedRtkApi
