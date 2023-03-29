import React, { PropsWithChildren } from 'react'
import {
  Path,
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form'

export type Props<T extends { [k: string]: FieldValues }> = PropsWithChildren<{
  control: Control<T>
  name: FieldPath<T>
}>

type FormElProps<C extends FieldValues> = Pick<
  ControllerRenderProps<C, Path<C>>,
  'value' | 'onChange'
>

export type FormEl = React.ReactElement<
  FormElProps<Record<string, FieldValues>>
>
