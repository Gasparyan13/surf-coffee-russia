import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { Props as DatePickerProps } from '../../../../../../common/uiKit/components/DatePicker/DatePicker.types'

export type Props<T extends { [k: string]: FieldValues }> = {
  control: Control<T>
  name: FieldPath<T>
  disableFuture?: DatePickerProps['disableFuture']
  disablePast?: DatePickerProps['disablePast']
  labelText: string
  helperText?: string
  minDate?: Date
  maxDate?: Date
}
