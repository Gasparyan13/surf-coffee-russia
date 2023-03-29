import { emptySplitApi as api } from '../../core/emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSpotConfigWizardContext: build.query<
      GetSpotConfigWizardContextApiResponse,
      GetSpotConfigWizardContextApiArg
    >({
      query: (queryArg) => ({
        url: `/spot_config/wizard/context`,
        params: { enterpriseId: queryArg.enterpriseId },
      }),
    }),
    putSpotConfigWizardContext: build.mutation<
      PutSpotConfigWizardContextApiResponse,
      PutSpotConfigWizardContextApiArg
    >({
      query: (queryArg) => ({
        url: `/spot_config/wizard/context`,
        method: 'PUT',
        body: queryArg.spotWizardContextUpdateDto,
      }),
    }),
    postSpotConfigWizardContext: build.mutation<
      PostSpotConfigWizardContextApiResponse,
      PostSpotConfigWizardContextApiArg
    >({
      query: (queryArg) => ({
        url: `/spot_config/wizard/context`,
        method: 'POST',
        body: queryArg.spotWizardContextCreateDto,
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type GetSpotConfigWizardContextApiResponse =
  /** status 200 Успешно */ SpotWizardContextViewDto
export type GetSpotConfigWizardContextApiArg = {
  enterpriseId: number
}
export type PutSpotConfigWizardContextApiResponse =
  /** status 200 Успешно. */ SpotWizardContextViewDto
export type PutSpotConfigWizardContextApiArg = {
  spotWizardContextUpdateDto: SpotWizardContextUpdateDto
}
export type PostSpotConfigWizardContextApiResponse =
  /** status 200 Успешно. */ SpotWizardContextViewDto
export type PostSpotConfigWizardContextApiArg = {
  spotWizardContextCreateDto: SpotWizardContextCreateDto
}
export type WorkingHoursStep = {
  allDayStart?: string
  allDayEnd?: string
  workDayStart?: string
  workDayEnd?: string
  weekEndStart?: string
  weekEndEnd?: string
}
export type ShiftData = {
  segment?: number
  name?: string
  start?: string
  end?: string
}
export type ShiftLayout = {
  weekdays?: ShiftData[]
  weekends?: ShiftData[]
}
export type ShiftsStep = {
  usePreset?: boolean
  preset?: ShiftLayout
  manual?: ShiftLayout
}
export type WorkersStep = object
export type RevenueStep = object
export type SpotWizardContextViewDto = {
  id?: number
  stepName?: 'WORKING_HOURS' | 'SHIFTS' | 'WORKERS' | 'REVENUE'
  enterpriseId?: number
  workingHoursStep?: WorkingHoursStep
  shiftsStep?: ShiftsStep
  workersStep?: WorkersStep
  revenueStep?: RevenueStep
}
export type SpotWizardContextUpdateDto = {
  id?: number
  stepName?: 'WORKING_HOURS' | 'SHIFTS' | 'WORKERS' | 'REVENUE'
  enterpriseId?: number
  workingHoursStep?: WorkingHoursStep
  shiftsStep?: ShiftsStep
  workersStep?: WorkersStep
  revenueStep?: RevenueStep
}
export type SpotWizardContextCreateDto = {
  stepName?: 'WORKING_HOURS' | 'SHIFTS' | 'WORKERS' | 'REVENUE'
  enterpriseId?: number
  workingHoursStep?: WorkingHoursStep
  shiftsStep?: ShiftsStep
  workersStep?: WorkersStep
  revenueStep?: RevenueStep
}
export const {
  useGetSpotConfigWizardContextQuery,
  useLazyGetSpotConfigWizardContextQuery,
  usePutSpotConfigWizardContextMutation,
  usePostSpotConfigWizardContextMutation,
} = injectedRtkApi
