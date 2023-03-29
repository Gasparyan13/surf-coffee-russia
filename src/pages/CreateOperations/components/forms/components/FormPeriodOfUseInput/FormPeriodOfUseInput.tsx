import React from 'react'

import { TextField } from '@uiKit'

import { ExpensesItemFieldKey } from '../FormExpenses'
import * as T from './FormPeriodOfUseInput.types'

export const FormPeriodOfUseInput: React.FC<T.Props> = ({
  value,
  onChange,
  error,
  label = 'Срок полезного использования',
  placeholder = 'от 12 месяцев',
  disabled,
}) => {
  return (
    <TextField
      disabled={disabled}
      error={!!error}
      helperText={error}
      labelText={label}
      name={ExpensesItemFieldKey.PERIOD_OF_USE}
      placeholder={placeholder}
      type="number"
      value={value}
      onChange={onChange}
    />
  )
}
