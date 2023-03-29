import React from 'react'
import { Controller, FieldValues } from 'react-hook-form'

import { DEFAULT_DATE_FORMAT } from '@constants'

import { DatePicker } from '@uiKit'

import * as T from './FormDateInput.types'

export const FormDateInput: <C extends FieldValues>(
  props: T.Props<C>,
) => React.ReactElement<T.Props<C>> = ({
  name,
  control,
  labelText,
  helperText,
  disableFuture,
  disablePast,
  minDate,
  maxDate,
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <DatePicker
        disableFuture={disableFuture}
        disablePast={disablePast}
        error={!!error?.message}
        helperText={!!error?.message && helperText}
        inputFormat={DEFAULT_DATE_FORMAT}
        labelText={labelText}
        maxDate={maxDate}
        minDate={minDate}
        value={value}
        onChange={(newValue) => onChange(newValue)}
      />
    )}
  />
)
