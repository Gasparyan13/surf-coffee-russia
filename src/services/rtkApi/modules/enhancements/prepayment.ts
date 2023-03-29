import { api } from '../__generated__/prepayment'

const enhancedRtkApi = api.enhanceEndpoints({
  endpoints: {
    patchPrepaymentContractors(endpoint) {
      endpoint.query = (queryArg) => ({
        url: `/prepayment/contractors`,
        method: 'PATCH',
        body: queryArg.contractorUpdateDto,
        responseHandler: async (response) => response.toString(),
      })
    },
    deletePrepaymentContractorsById(endpoint) {
      endpoint.query = (queryArg) => ({
        url: `/prepayment/contractors/${queryArg.id}`,
        method: 'DELETE',
        responseHandler: async (response) => response.toString(),
      })
    },
  },
})

export const {
  usePatchPrepaymentContractorsMutation,
  useDeletePrepaymentContractorsByIdMutation,
} = enhancedRtkApi
