import React, { SyntheticEvent, useCallback, ReactElement } from 'react'
import {
  Controller,
  FieldValues,
  ControllerRenderProps,
  FieldPath,
} from 'react-hook-form'

import { ToggleButtonGroup } from '@uiKit'

import * as Styled from './FormToggleButtonGroup.styled'
import * as T from './FormToggleButtonGroup.types'

export const FormToggleButtonGroup: <C extends FieldValues>(
  props: T.Props<C>,
) => ReactElement<T.Props<C>> = ({
  name,
  control,
  options,
  onChange,
  disabled,
}) => {
  const handleChange = useCallback<
    <F extends FieldValues>(
      formOnChange: ControllerRenderProps<FieldPath<F>>['onChange'],
    ) => (event: SyntheticEvent<Element, Event>, newValue: string) => void
  >(
    (formOnChange) => (event, newValue) => {
      if (onChange) {
        return onChange(event, newValue, formOnChange)
      }
      return formOnChange(newValue)
    },
    [onChange],
  )

  return (
    <Styled.ToggleGroup>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange: formOnChange } }) => (
          <ToggleButtonGroup
            currentValue={value}
            disabled={disabled}
            tabs={options}
            onChange={handleChange(formOnChange)}
          />
        )}
      />
    </Styled.ToggleGroup>
  )
}
