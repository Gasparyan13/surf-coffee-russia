import React from 'react'

import { RadioButtonGroup } from '@uiKit'

import * as T from './FormRadioButtonGroup.types'

export const FormRadioButtonGroup: React.FC<T.Props> = ({
  name,
  defaultValue,
  options,
  label = 'Тип оплаты',
  onChange,
  error,
}) => {
  return (
    <RadioButtonGroup
      defaultValue={defaultValue}
      error={error}
      label={label}
      name={name}
      options={options}
      onChange={onChange}
    />
  )
}
