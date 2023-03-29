import React, { cloneElement, isValidElement } from 'react'
import { Controller, FieldValues } from 'react-hook-form'

import { Nullable } from '@common/types/Nullable'

import * as T from './FormElController.types'

export const FormElController: <C extends FieldValues>(
  props: T.Props<C>,
) => Nullable<React.ReactElement<T.Props<C>>> = ({ children, ...props }) => {
  if (!isValidElement(children)) return null

  return (
    <Controller
      {...props}
      render={({ field: { value, onChange } }) =>
        cloneElement(children as T.FormEl, {
          value,
          onChange,
        })
      }
    />
  )
}
