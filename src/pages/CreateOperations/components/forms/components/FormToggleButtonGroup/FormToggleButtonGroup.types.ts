import { SyntheticEvent } from 'react'
import {
  Control,
  FieldPath,
  FieldValues,
  ControllerRenderProps,
} from 'react-hook-form'

export type Props<T extends { [k: string]: FieldValues }> = {
  control: Control<T>
  name: FieldPath<T>
  disabled?: boolean
  options: { label: string }[]
  onChange?: (
    event: SyntheticEvent<Element, Event>,
    newValue: string,
    callBack: ControllerRenderProps<FieldPath<T>>['onChange'],
  ) => void
}
