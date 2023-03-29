import { emptySplitApi as api } from '../../core/emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPrincipal: build.query<GetPrincipalApiResponse, GetPrincipalApiArg>({
      query: () => ({ url: `/principal` }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type GetPrincipalApiResponse =
  /** status 200 Успешно. */ PrincipalViewDto
export type GetPrincipalApiArg = void
export type PrincipalViewDto = {
  id?: number
  email?: string
  name?: string
  surname?: string
  mid_name?: string
  phone_number?: string
}
export const { useGetPrincipalQuery, useLazyGetPrincipalQuery } = injectedRtkApi
