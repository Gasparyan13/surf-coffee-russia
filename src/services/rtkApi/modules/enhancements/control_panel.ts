import { api } from '../__generated__/control_panel'

const enhancedRtkApi = api.enhanceEndpoints({
  endpoints: {
    patchControlPanelEnterprisesByIdName(endpoint) {
      endpoint.query = (queryArg) => ({
        url: `/control_panel/enterprises/${queryArg.id}/name`,
        method: 'PATCH',
        params: { name: queryArg.name },
        responseHandler: async (response) => response.toString(),
      })
    },
    getControlPanelEnterprisesByIdName(endpoint) {
      endpoint.query = (queryArg) => ({
        url: `/control_panel/enterprises/${queryArg.id}/name`,
        method: 'GET',
        responseHandler: 'text',
      })
    },
  },
})

export const {
  usePatchControlPanelEnterprisesByIdNameMutation,
  useGetControlPanelEnterprisesByIdNameQuery,
  useLazyGetControlPanelEnterprisesByIdNameQuery,
} = enhancedRtkApi
