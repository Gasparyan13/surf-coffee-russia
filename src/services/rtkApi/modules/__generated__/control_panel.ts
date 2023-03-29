import { emptySplitApi as api } from '../../core/emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getControlPanelEnterprisesByIdName: build.query<
      GetControlPanelEnterprisesByIdNameApiResponse,
      GetControlPanelEnterprisesByIdNameApiArg
    >({
      query: (queryArg) => ({
        url: `/control_panel/enterprises/${queryArg.id}/name`,
      }),
    }),
    patchControlPanelEnterprisesByIdName: build.mutation<
      PatchControlPanelEnterprisesByIdNameApiResponse,
      PatchControlPanelEnterprisesByIdNameApiArg
    >({
      query: (queryArg) => ({
        url: `/control_panel/enterprises/${queryArg.id}/name`,
        method: 'PATCH',
        params: { name: queryArg.name },
      }),
    }),
    getControlPanelEnterprisesById: build.query<
      GetControlPanelEnterprisesByIdApiResponse,
      GetControlPanelEnterprisesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/control_panel/enterprises/${queryArg.id}`,
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type GetControlPanelEnterprisesByIdNameApiResponse =
  /** status 200 Успешно */ string
export type GetControlPanelEnterprisesByIdNameApiArg = {
  /** id предприятия */
  id: number
}
export type PatchControlPanelEnterprisesByIdNameApiResponse =
  /** status 200 Успешно */ string
export type PatchControlPanelEnterprisesByIdNameApiArg = {
  /** id предприятия */
  id: number
  /** новое название предприятия */
  name: string
}
export type GetControlPanelEnterprisesByIdApiResponse =
  /** status 200 Предприятие успешно экспортировано. */ EnterpriseDto
export type GetControlPanelEnterprisesByIdApiArg = {
  /** id предприятия */
  id: number
}
export type RegionDto = {
  id?: number
  name?: string
}
export type CityDto = {
  id?: number
  name?: string
  region?: RegionDto
}
export type EnterpriseCategoryDto = {
  id?: number
  name?: string
}
export type EnterpriseModelDto = {
  id?: number
  name?: string
}
export type LegalEntityDto = {
  id?: number
  name?: string
}
export type EnterpriseDto = {
  id?: number
  name?: string
  address?: string
  city?: CityDto
  enterpriseCategory?: EnterpriseCategoryDto
  enterpriseModel?: EnterpriseModelDto
  legalEntity?: LegalEntityDto
}
export const {
  useGetControlPanelEnterprisesByIdNameQuery,
  useLazyGetControlPanelEnterprisesByIdNameQuery,
  usePatchControlPanelEnterprisesByIdNameMutation,
  useGetControlPanelEnterprisesByIdQuery,
  useLazyGetControlPanelEnterprisesByIdQuery,
} = injectedRtkApi
