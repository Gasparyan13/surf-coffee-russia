import React from 'react'
import { Controller, FieldValues } from 'react-hook-form'

import { ContractorDto } from '@rtkApi/modules/__generated__/prepayment'

import { ContractorsMock } from '@testEnv/mocks/constants/contractor'

import { Props as FormContractorInputProps } from '../components/forms/components/FormContractorInput/FormContractorInput.types'

export const MockFormContractorInput: <C extends FieldValues>(
  props: FormContractorInputProps<C>,
) => React.ReactElement<FormContractorInputProps<C>> = ({
  name,
  control,
  errors,
}) => {
  const handleChange =
    (onChange: (newValue: ContractorDto) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(ContractorsMock[event?.target.value] as ContractorDto)
    }

  return (
    <>
      <span>Контрагент</span>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <input
            placeholder="Например, Васильев"
            value={value?.alias ?? ''}
            onChange={handleChange(onChange)}
          />
        )}
      />
      {errors[name] && <div>{(errors[name]?.message as string) ?? ''}</div>}
    </>
  )
}
