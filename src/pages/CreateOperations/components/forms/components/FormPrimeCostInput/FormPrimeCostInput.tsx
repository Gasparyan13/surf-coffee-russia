import React from 'react'

import { CurrencyField } from '@uiKit'

import * as T from './FormPrimeCostInput.types'

export const FormPrimeCostInput: React.FC<T.Props> = ({
  value,
  onChange,
  error,
  label = 'Себестоимость',
  placeholder = 'Например, 1 000',
  disabled,
}) => (
  <CurrencyField
    disabled={disabled}
    error={!!error}
    helperText={error}
    labelText={label}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
)
