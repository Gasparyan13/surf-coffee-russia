import { emptySplitApi as api } from '../../core/emptyApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({}),
  overrideExisting: false,
})
export { injectedRtkApi as api }
export const {} = injectedRtkApi
