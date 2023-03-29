import React, { useState } from 'react'

import { Nullable } from '@common/types/Nullable'

import { Autocomplete } from '@uiKit'
import { AutocompleteItem } from '@uiKit/components/Autocomplete/Autocomplete.types'

import * as T from './FormDenominationAutocomplete.types'

export const FormDenominationAutocomplete: React.FC<T.Props> = ({
  onChange,
  error,
  options,
  label = 'Наименование',
  placeholder = 'Наименования товара или услуги',
  disabled,
  value,
}) => {
  const [currentOption, setCurrentOption] = useState<
    Nullable<AutocompleteItem>
  >(value ? { label: value, value, key: value } : null)

  const handleChange = (
    event: React.SyntheticEvent,
    option: Nullable<AutocompleteItem>,
  ) => {
    setCurrentOption(option)
    onChange(event, option)
  }

  return (
    <Autocomplete
      disabled={disabled}
      error={!!error}
      helperText={error}
      labelText={label}
      options={options}
      placeholder={placeholder}
      value={currentOption}
      onChange={handleChange}
    />
  )
}
