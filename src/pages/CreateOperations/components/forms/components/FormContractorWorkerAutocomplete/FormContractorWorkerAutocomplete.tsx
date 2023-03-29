import React from 'react'
import { Controller, FieldValues } from 'react-hook-form'

import { ContractorAutocomplete } from '@common/components/ContractorAutocomplete'

import { makeInputError } from '@helpers'

import * as T from './FormContractorWorkerAutocomplete.types'

export const FormContractorWorkerAutocomplete: <C extends FieldValues>(
  props: T.Props<C>,
) => React.ReactElement<T.Props<C>> = ({ name, control, errors }) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { value, onChange } }) => (
      <ContractorAutocomplete
        {...makeInputError(name, errors)}
        isWorker
        labelText="Контрагент"
        placeholder="Например, Васильев"
        value={value}
        onChange={onChange}
      />
    )}
  />
)
