import { emptySplitApi as api } from '../../core/emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPrepaymentContractors: build.query<
      GetPrepaymentContractorsApiResponse,
      GetPrepaymentContractorsApiArg
    >({
      query: (queryArg) => ({
        url: `/prepayment/contractors`,
        params: {
          enterpriseId: queryArg.enterpriseId,
          isWorker: queryArg.isWorker,
        },
      }),
    }),
    postPrepaymentContractors: build.mutation<
      PostPrepaymentContractorsApiResponse,
      PostPrepaymentContractorsApiArg
    >({
      query: (queryArg) => ({
        url: `/prepayment/contractors`,
        method: 'POST',
        body: queryArg.contractorCreateDto,
      }),
    }),
    patchPrepaymentContractors: build.mutation<
      PatchPrepaymentContractorsApiResponse,
      PatchPrepaymentContractorsApiArg
    >({
      query: (queryArg) => ({
        url: `/prepayment/contractors`,
        method: 'PATCH',
        body: queryArg.contractorUpdateDto,
      }),
    }),
    getPrepaymentBudgetItems: build.query<
      GetPrepaymentBudgetItemsApiResponse,
      GetPrepaymentBudgetItemsApiArg
    >({
      query: (queryArg) => ({
        url: `/prepayment/budget_items`,
        params: {
          isPurchase: queryArg.isPurchase,
          operationType: queryArg.operationType,
        },
      }),
    }),
    postPrepaymentBudgetItems: build.mutation<
      PostPrepaymentBudgetItemsApiResponse,
      PostPrepaymentBudgetItemsApiArg
    >({
      query: (queryArg) => ({
        url: `/prepayment/budget_items`,
        method: 'POST',
        body: queryArg.budgetItemCreateDto,
      }),
    }),
    patchPrepaymentBudgetItems: build.mutation<
      PatchPrepaymentBudgetItemsApiResponse,
      PatchPrepaymentBudgetItemsApiArg
    >({
      query: (queryArg) => ({
        url: `/prepayment/budget_items`,
        method: 'PATCH',
        body: queryArg.budgetItemUpdateDto,
      }),
    }),
    getPrepaymentSuggestOrgByInn: build.query<
      GetPrepaymentSuggestOrgByInnApiResponse,
      GetPrepaymentSuggestOrgByInnApiArg
    >({
      query: (queryArg) => ({ url: `/prepayment/suggest_org/${queryArg.inn}` }),
    }),
    getPrepaymentContractorsById: build.query<
      GetPrepaymentContractorsByIdApiResponse,
      GetPrepaymentContractorsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/prepayment/contractors/${queryArg.id}`,
        params: { onlyActive: queryArg.onlyActive },
      }),
    }),
    deletePrepaymentContractorsById: build.mutation<
      DeletePrepaymentContractorsByIdApiResponse,
      DeletePrepaymentContractorsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/prepayment/contractors/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    getPrepaymentBudgetItemsById: build.query<
      GetPrepaymentBudgetItemsByIdApiResponse,
      GetPrepaymentBudgetItemsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/prepayment/budget_items/${queryArg.id}` }),
    }),
    deletePrepaymentBudgetItemsById: build.mutation<
      DeletePrepaymentBudgetItemsByIdApiResponse,
      DeletePrepaymentBudgetItemsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/prepayment/budget_items/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    getPrepaymentBudgetItemsTreeView: build.query<
      GetPrepaymentBudgetItemsTreeViewApiResponse,
      GetPrepaymentBudgetItemsTreeViewApiArg
    >({
      query: (queryArg) => ({
        url: `/prepayment/budget_items/treeView`,
        params: {
          isPurchase: queryArg.isPurchase,
          operationType: queryArg.operationType,
        },
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export type GetPrepaymentContractorsApiResponse =
  /** status 200 Получены все значения справочника контрагентов */ ContractorDto[]
export type GetPrepaymentContractorsApiArg = {
  /** id предприятия (опционально) */
  enterpriseId?: number
  /** признак для фильтрации контрагентов по наличию привязки к сотруднику (опционально) */
  isWorker?: boolean
}
export type PostPrepaymentContractorsApiResponse =
  /** status 200 Контрагент добавлен. */ Blob
export type PostPrepaymentContractorsApiArg = {
  contractorCreateDto: ContractorCreateDto
}
export type PatchPrepaymentContractorsApiResponse =
  /** status 200 Контрагент обновлен. */ string
export type PatchPrepaymentContractorsApiArg = {
  contractorUpdateDto: ContractorUpdateDto
}
export type GetPrepaymentBudgetItemsApiResponse =
  /** status 200 Получены все значения справочника статей расходов */ BudgetItemViewDto[]
export type GetPrepaymentBudgetItemsApiArg = {
  /** вид операции. true - покупка, false - продажа */
  isPurchase?: boolean
  /** тип операции */
  operationType?:
    | 'CASH_ORDER'
    | 'PAYMENT_INVOICE'
    | 'SERVICE_ACT'
    | 'TRANSACTION'
    | 'WAYBILL'
    | 'RECEIPT'
    | 'PLANNED'
}
export type PostPrepaymentBudgetItemsApiResponse =
  /** status 200 Статья расходов добавлена. */ Blob
export type PostPrepaymentBudgetItemsApiArg = {
  budgetItemCreateDto: BudgetItemCreateDto
}
export type PatchPrepaymentBudgetItemsApiResponse =
  /** status 200 Статья расходов успешно обновлена. */ string
export type PatchPrepaymentBudgetItemsApiArg = {
  budgetItemUpdateDto: BudgetItemUpdateDto
}
export type GetPrepaymentSuggestOrgByInnApiResponse =
  /** status 200 Найдена организация по введенному ИНН */ ContractorCreateDto
export type GetPrepaymentSuggestOrgByInnApiArg = {
  inn: string
}
export type GetPrepaymentContractorsByIdApiResponse =
  /** status 200 Найден нужный контрагент */ ContractorDto
export type GetPrepaymentContractorsByIdApiArg = {
  /** Параметр для управления выборкой только активных записей. */
  onlyActive?: boolean
  id: number
}
export type DeletePrepaymentContractorsByIdApiResponse =
  /** status 200 Контрагент удален */ string
export type DeletePrepaymentContractorsByIdApiArg = {
  id: number
}
export type GetPrepaymentBudgetItemsByIdApiResponse =
  /** status 200 Найдена нужная статья расходов */ BudgetItemViewDto
export type GetPrepaymentBudgetItemsByIdApiArg = {
  id: number
}
export type DeletePrepaymentBudgetItemsByIdApiResponse =
  /** status 200 Статья расходов удалена */ string
export type DeletePrepaymentBudgetItemsByIdApiArg = {
  id: number
}
export type GetPrepaymentBudgetItemsTreeViewApiResponse =
  /** status 200 Получены все значения справочника статей расходов */ TreeBudgetItemDto[]
export type GetPrepaymentBudgetItemsTreeViewApiArg = {
  /** вид операции. true - покупка, false - продажа */
  isPurchase?: boolean
  /** тип операции */
  operationType?:
    | 'CASH_ORDER'
    | 'PAYMENT_INVOICE'
    | 'SERVICE_ACT'
    | 'TRANSACTION'
    | 'WAYBILL'
    | 'RECEIPT'
    | 'PLANNED'
}
export type ContractorDto = {
  id?: number
  alias?: string
  orgName?: string
  ogrn?: string
  inn?: string
  kpp?: string
  address?: string
  okpo?: string
  okved?: string
  enterpriseId?: number
  type?: string
}
export type ContractorCreateDto = {
  alias: string
  orgName?: string
  ogrn?: string
  inn?: string
  kpp?: string
  address?: string
  okpo?: string
  okved?: string
  enterpriseId?: number
  type?: string
}
export type ContractorUpdateDto = {
  id: number
  alias: string
  orgName?: string
  ogrn?: string
  inn?: string
  kpp?: string
  address?: string
  okpo?: string
  okved?: string
  enterpriseId?: number
  type?: string
}
export type BudgetItemViewDto = {
  id?: number
  name?: string
  rootId?: number
  level?: number
  parentItemId?: number
  children?: number[]
  isExpense?: boolean
  isExternal?: boolean
  isCapitalAssets?: boolean
}
export type BudgetItemCreateDto = {
  name?: string
  isExpense?: boolean
  isExternal?: boolean
  isCapitalAssets?: boolean
}
export type BudgetItemUpdateDto = {
  id?: number
  name?: string
  parentId?: number
  isExpense?: boolean
  isExternal?: boolean
  isCapitalAssets?: boolean
}
export type TreeBudgetItemDto = {
  id?: number
  name?: string
  parentId?: number
  children?: TreeBudgetItemDto[]
  external?: boolean
  expense?: boolean
  capitalAsset?: boolean
}
export const {
  useGetPrepaymentContractorsQuery,
  useLazyGetPrepaymentContractorsQuery,
  usePostPrepaymentContractorsMutation,
  usePatchPrepaymentContractorsMutation,
  useGetPrepaymentBudgetItemsQuery,
  useLazyGetPrepaymentBudgetItemsQuery,
  usePostPrepaymentBudgetItemsMutation,
  usePatchPrepaymentBudgetItemsMutation,
  useGetPrepaymentSuggestOrgByInnQuery,
  useLazyGetPrepaymentSuggestOrgByInnQuery,
  useGetPrepaymentContractorsByIdQuery,
  useLazyGetPrepaymentContractorsByIdQuery,
  useDeletePrepaymentContractorsByIdMutation,
  useGetPrepaymentBudgetItemsByIdQuery,
  useLazyGetPrepaymentBudgetItemsByIdQuery,
  useDeletePrepaymentBudgetItemsByIdMutation,
  useGetPrepaymentBudgetItemsTreeViewQuery,
  useLazyGetPrepaymentBudgetItemsTreeViewQuery,
} = injectedRtkApi
