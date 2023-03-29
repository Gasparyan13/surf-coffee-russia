import { api } from '../__generated__/enterprise'

const enhancedRtkApi = api.enhanceEndpoints({
  endpoints: {
    deleteEnterpriseWorkersById(endpoint) {
      endpoint.query = (queryArg) => ({
        url: `/enterprise/workers/${queryArg.id}`,
        method: 'DELETE',
        responseHandler: async (response) => response.toString(),
      })
    },
  },
})

export const { useDeleteEnterpriseWorkersByIdMutation } = enhancedRtkApi
