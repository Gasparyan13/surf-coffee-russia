import { emptySplitApi as api } from '../../core/emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMetricForecast: build.query<
      GetMetricForecastApiResponse,
      GetMetricForecastApiArg
    >({
      query: (queryArg) => ({
        url: `/metric/forecast`,
        params: { enterpriseId: queryArg.enterpriseId, month: queryArg.month },
      }),
    }),
    postMetricForecast: build.mutation<
      PostMetricForecastApiResponse,
      PostMetricForecastApiArg
    >({
      query: () => ({ url: `/metric/forecast`, method: 'POST' }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type GetMetricForecastApiResponse =
  /** status 200 Получены все метрики */ ForecastMetricDto
export type GetMetricForecastApiArg = {
  /** id предприятия */
  enterpriseId: number
  /** месяц */
  month?: string
}
export type PostMetricForecastApiResponse =
  /** status 200 Сохрарены все метрики */ string
export type PostMetricForecastApiArg = void
export type ForecastMetricItemDto = {
  id?: number
  level?: number
  parentId?: number
  children?: number[]
  metricName?: string
  plan?: number
  fact?: number
  delta?: number
  type?: 'MONEY' | 'PERCENT'
  color?: 'GREEN' | 'RED' | 'BLACK'
}
export type ForecastMetricDto = {
  month?: string
  revenue?: number
  revenueDate?: string
  reportTimestamp?: string
  metrics?: ForecastMetricItemDto[]
}
export const {
  useGetMetricForecastQuery,
  useLazyGetMetricForecastQuery,
  usePostMetricForecastMutation,
} = injectedRtkApi
