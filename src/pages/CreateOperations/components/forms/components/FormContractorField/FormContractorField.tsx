import React from 'react'
import { FieldValues } from 'react-hook-form'

import { FormContractorInput } from '../FormContractorInput'
import { FormContractorWorkerAutocomplete } from '../FormContractorWorkerAutocomplete'
import * as T from './FormContractorField.types'

export const FormContractorField: <C extends FieldValues>(
  props: T.Props<C>,
) => React.ReactElement<T.Props<C>> = ({
  isAddContractorWorker,
  control,
  name,
  errors,
}) => {
  return isAddContractorWorker ? (
    <FormContractorWorkerAutocomplete
      control={control}
      errors={errors}
      name={name}
    />
  ) : (
    <FormContractorInput control={control} errors={errors} name={name} />
  )
}
