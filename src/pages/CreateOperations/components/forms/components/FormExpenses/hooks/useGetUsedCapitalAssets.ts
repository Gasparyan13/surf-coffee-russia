import { useCallback, useEffect, useState } from 'react'

import { AutocompleteItem } from '@uiKit/components/Autocomplete/Autocomplete.types'

import { useLazyGetFinancialUsedCapitalAssetsQuery } from '@rtkApi/modules/__generated__/financial'

export const useGetUsedCapitalAssets = (
  hasAdditionalFieldsCapitalAssets = false,
): AutocompleteItem[] => {
  const [apiGetFinancialUsedCapitalAssets] =
    useLazyGetFinancialUsedCapitalAssetsQuery()
  const [capitalAssets, setCapitalAssets] = useState<AutocompleteItem[]>([])

  const fetchUsedCapitalAssets = useCallback(async () => {
    if (!hasAdditionalFieldsCapitalAssets) return

    const result = await apiGetFinancialUsedCapitalAssets()

    if (!result.data || !result.data.length) return

    const capitalAssetsArray = result.data.map((item) => ({
      key: item,
      label: item,
      value: item,
    }))

    if (capitalAssetsArray.length) {
      setCapitalAssets(capitalAssetsArray)
    }
  }, [apiGetFinancialUsedCapitalAssets, hasAdditionalFieldsCapitalAssets])

  useEffect(() => {
    fetchUsedCapitalAssets()

    return () => setCapitalAssets([])
  }, [fetchUsedCapitalAssets])

  return capitalAssets
}
