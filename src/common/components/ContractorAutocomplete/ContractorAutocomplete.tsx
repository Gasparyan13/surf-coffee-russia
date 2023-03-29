import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'

import { Nullable } from '@common/types/Nullable'

import { Autocomplete } from '@uiKit'
import { AutocompleteItem } from '@uiKit/components/Autocomplete/Autocomplete.types'

import { useLazyGetPrepaymentContractorsQuery } from '@rtkApi/modules/__generated__/prepayment'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import * as T from './ContractorAutocomplete.types'
import { getListOptions, getOption } from './utils/getters'

export const ContractorAutocomplete: React.FC<T.Props> = ({
  isWorker,
  value = null,
  onChange,
  ...rest
}) => {
  const enterpriseId = useSelector(getManagerCurrentProjectId)

  const [apiReqGetContractorsByProjectId, { data: contractorsData }] =
    useLazyGetPrepaymentContractorsQuery()

  const handleChange = (
    event: React.SyntheticEvent,
    option: Nullable<AutocompleteItem>,
  ) => {
    const contractor = contractorsData?.find(
      (item) => item.id === option?.value,
    )

    onChange(contractor || null)
  }

  useLayoutEffect(() => {
    apiReqGetContractorsByProjectId({
      enterpriseId,
      isWorker,
    })
  }, [apiReqGetContractorsByProjectId, enterpriseId, isWorker])

  return (
    <Autocomplete
      {...rest}
      options={contractorsData ? getListOptions(contractorsData) : []}
      value={getOption(value)}
      onChange={handleChange}
    />
  )
}
