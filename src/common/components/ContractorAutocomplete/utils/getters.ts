import { Nullable } from '@common/types/Nullable'

import { AutocompleteItem } from '@uiKit/components/Autocomplete/Autocomplete.types'

import { ContractorDto } from '@rtkApi/modules/__generated__/prepayment'

export const getListOptions = (
  contractors: ContractorDto[],
): AutocompleteItem[] =>
  contractors?.map((item) => ({
    label: item.alias!,
    value: item.id!,
    key: item.id!,
  }))

export const getOption = (contractor: Nullable<ContractorDto>) =>
  contractor
    ? {
        label: contractor.alias!,
        value: contractor.id!,
        key: contractor.id!,
      }
    : null
