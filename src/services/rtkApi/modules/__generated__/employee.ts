import { emptySplitApi as api } from '../../core/emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEmployeeLegalEntities: build.query<
      GetEmployeeLegalEntitiesApiResponse,
      GetEmployeeLegalEntitiesApiArg
    >({
      query: () => ({ url: `/employee/legal_entities` }),
    }),
    putEmployeeLegalEntities: build.mutation<
      PutEmployeeLegalEntitiesApiResponse,
      PutEmployeeLegalEntitiesApiArg
    >({
      query: (queryArg) => ({
        url: `/employee/legal_entities`,
        method: 'PUT',
        body: queryArg.legalEntityUpdateDto,
      }),
    }),
    postEmployeeLegalEntities: build.mutation<
      PostEmployeeLegalEntitiesApiResponse,
      PostEmployeeLegalEntitiesApiArg
    >({
      query: (queryArg) => ({
        url: `/employee/legal_entities`,
        method: 'POST',
        body: queryArg.legalEntityCreateDto,
      }),
    }),
    getEmployeeRegions: build.query<
      GetEmployeeRegionsApiResponse,
      GetEmployeeRegionsApiArg
    >({
      query: () => ({ url: `/employee/regions` }),
    }),
    postEmployeeRegions: build.mutation<
      PostEmployeeRegionsApiResponse,
      PostEmployeeRegionsApiArg
    >({
      query: (queryArg) => ({
        url: `/employee/regions`,
        method: 'POST',
        body: queryArg.regionCreateDto,
      }),
    }),
    getEmployeeEnterpriseModels: build.query<
      GetEmployeeEnterpriseModelsApiResponse,
      GetEmployeeEnterpriseModelsApiArg
    >({
      query: () => ({ url: `/employee/enterprise_models` }),
    }),
    postEmployeeEnterpriseModels: build.mutation<
      PostEmployeeEnterpriseModelsApiResponse,
      PostEmployeeEnterpriseModelsApiArg
    >({
      query: (queryArg) => ({
        url: `/employee/enterprise_models`,
        method: 'POST',
        body: queryArg.enterpriseModelCreateDto,
      }),
    }),
    getEmployeeEnterpriseCategories: build.query<
      GetEmployeeEnterpriseCategoriesApiResponse,
      GetEmployeeEnterpriseCategoriesApiArg
    >({
      query: () => ({ url: `/employee/enterprise_categories` }),
    }),
    postEmployeeEnterpriseCategories: build.mutation<
      PostEmployeeEnterpriseCategoriesApiResponse,
      PostEmployeeEnterpriseCategoriesApiArg
    >({
      query: (queryArg) => ({
        url: `/employee/enterprise_categories`,
        method: 'POST',
        body: queryArg.enterpriseCategoryCreateDto,
      }),
    }),
    getEmployeeCities: build.query<
      GetEmployeeCitiesApiResponse,
      GetEmployeeCitiesApiArg
    >({
      query: () => ({ url: `/employee/cities` }),
    }),
    postEmployeeCities: build.mutation<
      PostEmployeeCitiesApiResponse,
      PostEmployeeCitiesApiArg
    >({
      query: (queryArg) => ({
        url: `/employee/cities`,
        method: 'POST',
        body: queryArg.cityCreateDto,
      }),
    }),
    getEmployeeRegionsById: build.query<
      GetEmployeeRegionsByIdApiResponse,
      GetEmployeeRegionsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/employee/regions/${queryArg.id}` }),
    }),
    deleteEmployeeRegionsById: build.mutation<
      DeleteEmployeeRegionsByIdApiResponse,
      DeleteEmployeeRegionsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/employee/regions/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    getEmployeeLegalEntitiesById: build.query<
      GetEmployeeLegalEntitiesByIdApiResponse,
      GetEmployeeLegalEntitiesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/employee/legal_entities/${queryArg.id}` }),
    }),
    deleteEmployeeLegalEntitiesById: build.mutation<
      DeleteEmployeeLegalEntitiesByIdApiResponse,
      DeleteEmployeeLegalEntitiesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/employee/legal_entities/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    getEmployeeEnterpriseModelsById: build.query<
      GetEmployeeEnterpriseModelsByIdApiResponse,
      GetEmployeeEnterpriseModelsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/employee/enterprise_models/${queryArg.id}`,
      }),
    }),
    deleteEmployeeEnterpriseModelsById: build.mutation<
      DeleteEmployeeEnterpriseModelsByIdApiResponse,
      DeleteEmployeeEnterpriseModelsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/employee/enterprise_models/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    getEmployeeEnterpriseCategoriesById: build.query<
      GetEmployeeEnterpriseCategoriesByIdApiResponse,
      GetEmployeeEnterpriseCategoriesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/employee/enterprise_categories/${queryArg.id}`,
      }),
    }),
    deleteEmployeeEnterpriseCategoriesById: build.mutation<
      DeleteEmployeeEnterpriseCategoriesByIdApiResponse,
      DeleteEmployeeEnterpriseCategoriesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/employee/enterprise_categories/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    getEmployeeCitiesById: build.query<
      GetEmployeeCitiesByIdApiResponse,
      GetEmployeeCitiesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/employee/cities/${queryArg.id}` }),
    }),
    deleteEmployeeCitiesById: build.mutation<
      DeleteEmployeeCitiesByIdApiResponse,
      DeleteEmployeeCitiesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/employee/cities/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    getEmployeeCitiesByRegion: build.query<
      GetEmployeeCitiesByRegionApiResponse,
      GetEmployeeCitiesByRegionApiArg
    >({
      query: (queryArg) => ({
        url: `/employee/cities/by_region`,
        params: { regionId: queryArg.regionId },
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type GetEmployeeLegalEntitiesApiResponse =
  /** status 200 Юр.лица успешно экспортированы. */ LegalEntityDto[]
export type GetEmployeeLegalEntitiesApiArg = void
export type PutEmployeeLegalEntitiesApiResponse =
  /** status 200 Юр. лицо успешно обновлено. */ string
export type PutEmployeeLegalEntitiesApiArg = {
  legalEntityUpdateDto: LegalEntityUpdateDto
}
export type PostEmployeeLegalEntitiesApiResponse =
  /** status 200 Юр.лицо добавлено. */ Blob
export type PostEmployeeLegalEntitiesApiArg = {
  legalEntityCreateDto: LegalEntityCreateDto
}
export type GetEmployeeRegionsApiResponse =
  /** status 200 Регионы успешно экспортированы. */ RegionDto[]
export type GetEmployeeRegionsApiArg = void
export type PostEmployeeRegionsApiResponse =
  /** status 200 Регион добавлен. */ Blob
export type PostEmployeeRegionsApiArg = {
  regionCreateDto: RegionCreateDto
}
export type GetEmployeeEnterpriseModelsApiResponse =
  /** status 200 Модели предприятия успешно экспортированы. */ EnterpriseModelDto[]
export type GetEmployeeEnterpriseModelsApiArg = void
export type PostEmployeeEnterpriseModelsApiResponse =
  /** status 200 Модель предприятия добавлена. */ Blob
export type PostEmployeeEnterpriseModelsApiArg = {
  enterpriseModelCreateDto: EnterpriseModelCreateDto
}
export type GetEmployeeEnterpriseCategoriesApiResponse =
  /** status 200 Категории предприятия успешно экспортированы. */ EnterpriseCategoryDto[]
export type GetEmployeeEnterpriseCategoriesApiArg = void
export type PostEmployeeEnterpriseCategoriesApiResponse =
  /** status 200 Категория предприятия добавлена. */ Blob
export type PostEmployeeEnterpriseCategoriesApiArg = {
  enterpriseCategoryCreateDto: EnterpriseCategoryCreateDto
}
export type GetEmployeeCitiesApiResponse =
  /** status 200 Города успешно экспортированы. */ CityDto[]
export type GetEmployeeCitiesApiArg = void
export type PostEmployeeCitiesApiResponse =
  /** status 200 Город добавлен. */ Response
export type PostEmployeeCitiesApiArg = {
  cityCreateDto: CityCreateDto
}
export type GetEmployeeRegionsByIdApiResponse =
  /** status 200 Регион успешно экспортирован. */ RegionDto
export type GetEmployeeRegionsByIdApiArg = {
  id: number
}
export type DeleteEmployeeRegionsByIdApiResponse =
  /** status 200 Регион успешно удален. */ string
export type DeleteEmployeeRegionsByIdApiArg = {
  id: number
}
export type GetEmployeeLegalEntitiesByIdApiResponse =
  /** status 200 Юр.лицо успешно экспортировано. */ LegalEntityDto
export type GetEmployeeLegalEntitiesByIdApiArg = {
  id: number
}
export type DeleteEmployeeLegalEntitiesByIdApiResponse =
  /** status 200 Юр.лицо успешно удалено. */ string
export type DeleteEmployeeLegalEntitiesByIdApiArg = {
  id: number
}
export type GetEmployeeEnterpriseModelsByIdApiResponse =
  /** status 200 Модель предприятия успешно экспортирована. */ EnterpriseModelDto
export type GetEmployeeEnterpriseModelsByIdApiArg = {
  id: number
}
export type DeleteEmployeeEnterpriseModelsByIdApiResponse =
  /** status 200 Модель предприятия успешно удалена. */ string
export type DeleteEmployeeEnterpriseModelsByIdApiArg = {
  id: number
}
export type GetEmployeeEnterpriseCategoriesByIdApiResponse =
  /** status 200 Категория предприятия успешно экспортирована. */ EnterpriseCategoryDto
export type GetEmployeeEnterpriseCategoriesByIdApiArg = {
  id: number
}
export type DeleteEmployeeEnterpriseCategoriesByIdApiResponse =
  /** status 200 Категория предприятия успешно удалена. */ string
export type DeleteEmployeeEnterpriseCategoriesByIdApiArg = {
  id: number
}
export type GetEmployeeCitiesByIdApiResponse =
  /** status 200 Город успешно экспортирован. */ CityDto
export type GetEmployeeCitiesByIdApiArg = {
  id: number
}
export type DeleteEmployeeCitiesByIdApiResponse =
  /** status 200 Город успешно удален. */ string
export type DeleteEmployeeCitiesByIdApiArg = {
  id: number
}
export type GetEmployeeCitiesByRegionApiResponse =
  /** status 200 Города успешно экспортированы. */ CityDto[]
export type GetEmployeeCitiesByRegionApiArg = {
  regionId: number
}
export type LegalEntityDto = {
  id?: number
  name?: string
}
export type LegalEntityUpdateDto = {
  id?: number
  name?: string
}
export type LegalEntityCreateDto = {
  name?: string
}
export type RegionDto = {
  id?: number
  name?: string
}
export type RegionCreateDto = {
  name?: string
}
export type EnterpriseModelDto = {
  id?: number
  name?: string
}
export type EnterpriseModelCreateDto = {
  name?: string
}
export type EnterpriseCategoryDto = {
  id?: number
  name?: string
}
export type EnterpriseCategoryCreateDto = {
  name?: string
}
export type CityDto = {
  id?: number
  name?: string
  region?: RegionDto
}
export type Response = {
  message?: string
  entityId?: number
}
export type CityCreateDto = {
  name?: string
  region?: RegionDto
}
export const {
  useGetEmployeeLegalEntitiesQuery,
  useLazyGetEmployeeLegalEntitiesQuery,
  usePutEmployeeLegalEntitiesMutation,
  usePostEmployeeLegalEntitiesMutation,
  useGetEmployeeRegionsQuery,
  useLazyGetEmployeeRegionsQuery,
  usePostEmployeeRegionsMutation,
  useGetEmployeeEnterpriseModelsQuery,
  useLazyGetEmployeeEnterpriseModelsQuery,
  usePostEmployeeEnterpriseModelsMutation,
  useGetEmployeeEnterpriseCategoriesQuery,
  useLazyGetEmployeeEnterpriseCategoriesQuery,
  usePostEmployeeEnterpriseCategoriesMutation,
  useGetEmployeeCitiesQuery,
  useLazyGetEmployeeCitiesQuery,
  usePostEmployeeCitiesMutation,
  useGetEmployeeRegionsByIdQuery,
  useLazyGetEmployeeRegionsByIdQuery,
  useDeleteEmployeeRegionsByIdMutation,
  useGetEmployeeLegalEntitiesByIdQuery,
  useLazyGetEmployeeLegalEntitiesByIdQuery,
  useDeleteEmployeeLegalEntitiesByIdMutation,
  useGetEmployeeEnterpriseModelsByIdQuery,
  useLazyGetEmployeeEnterpriseModelsByIdQuery,
  useDeleteEmployeeEnterpriseModelsByIdMutation,
  useGetEmployeeEnterpriseCategoriesByIdQuery,
  useLazyGetEmployeeEnterpriseCategoriesByIdQuery,
  useDeleteEmployeeEnterpriseCategoriesByIdMutation,
  useGetEmployeeCitiesByIdQuery,
  useLazyGetEmployeeCitiesByIdQuery,
  useDeleteEmployeeCitiesByIdMutation,
  useGetEmployeeCitiesByRegionQuery,
  useLazyGetEmployeeCitiesByRegionQuery,
} = injectedRtkApi
