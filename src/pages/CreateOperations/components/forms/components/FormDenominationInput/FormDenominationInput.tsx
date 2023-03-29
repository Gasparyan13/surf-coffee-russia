import React from 'react'

import { TextField } from '@uiKit'

import * as T from './FormDenominationInput.types'

export const FormDenominationInput: React.FC<T.Props> = ({
  value,
  onChange,
  error,
  label = 'Наименование',
  placeholder = 'Наименования товара или услуги',
  inputProps,
  disabled,
}) => (
  <TextField
    disabled={disabled}
    error={!!error}
    helperText={error}
    inputProps={inputProps}
    labelText={label}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
)
