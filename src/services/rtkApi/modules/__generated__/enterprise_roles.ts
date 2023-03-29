import { emptySplitApi as api } from '../../core/emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEnterpriseRoles: build.query<
      GetEnterpriseRolesApiResponse,
      GetEnterpriseRolesApiArg
    >({
      query: (queryArg) => ({
        url: `/enterprise_roles`,
        params: { employeeId: queryArg.employeeId },
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type GetEnterpriseRolesApiResponse =
  /** status 200 Успешно. */ EnterprisesPerRoleViewDto
export type GetEnterpriseRolesApiArg = {
  /** id пользователя */
  employeeId: number
}
export type EnterprisesPerRoleViewDto = {
  barista?: number[]
  manager?: number[]
}
export const { useGetEnterpriseRolesQuery, useLazyGetEnterpriseRolesQuery } =
  injectedRtkApi
