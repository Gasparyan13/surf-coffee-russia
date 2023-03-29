import { Nullable } from '@common/types/Nullable'

import {
  Props as AutocompleteProps,
  AutocompleteItem,
} from '@uiKit/components/Autocomplete/Autocomplete.types'

import { ContractorDto } from '@rtkApi/modules/__generated__/prepayment'

export type Props = {
  isWorker?: boolean
  value?: Nullable<ContractorDto>
  onChange: (contractor: Nullable<ContractorDto>) => void
} & Omit<AutocompleteProps<AutocompleteItem>, 'value' | 'onChange' | 'options'>
