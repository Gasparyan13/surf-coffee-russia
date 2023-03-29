import { successGetUsedCapitalAssets } from '../api/financial'

export const mockCapitalAssetsArray = successGetUsedCapitalAssets.map(
  (item) => ({
    key: item,
    label: item,
    value: item,
  }),
)

export const mockUseGetUsedCapitalAssets = (
  hasAdditionalFieldsCapitalAssets = false,
) => {
  if (!hasAdditionalFieldsCapitalAssets) return

  return mockCapitalAssetsArray
}
