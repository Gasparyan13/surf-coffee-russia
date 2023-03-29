import { Nullable } from '@common/types/Nullable'

import { AutocompleteItem } from '@uiKit/components/Autocomplete/Autocomplete.types'

export type Props = {
  label?: string
  value?: string
  onChange: (e: React.SyntheticEvent, value: Nullable<AutocompleteItem>) => void
  error?: string
  placeholder?: string
  options: AutocompleteItem[]
  disabled?: boolean
}
