import { AutocompleteProps as MuiAutocompleteProps } from '@mui/material'

import { Props as InputProps } from '../FieldInputs/TextField/TextField.types'

type AutocompleteDefaultProps<T> = MuiAutocompleteProps<T, false, false, false>

export type AutocompleteItem = {
  label: string
  value: number | string
  key: string | number
}

export type Props<T extends AutocompleteItem> = Pick<
  AutocompleteDefaultProps<T>,
  | 'value'
  | 'onChange'
  | 'options'
  | 'autoComplete'
  | 'autoHighlight'
  | 'defaultValue'
  | 'disabled'
  | 'disablePortal'
  | 'filterOptions'
  | 'filterSelectedOptions'
  | 'fullWidth'
  | 'getOptionDisabled'
  | 'getOptionLabel'
  | 'id'
  | 'noOptionsText'
  | 'onClose'
  | 'onInputChange'
> &
  Pick<
    InputProps,
    'labelText' | 'helperText' | 'error' | 'placeholder' | 'size'
  >
