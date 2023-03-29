import { BaseDatePickerProps } from '@mui/x-date-pickers/DatePicker/shared'
import {
  BaseDateValidationProps,
  DayValidationProps,
  PickerStateProps,
} from '@mui/x-date-pickers/internals'

import { AddCSSprop } from '../../../types/Generics'
import { Nullable } from '../../../types/Nullable'
import { UIKitSizeType } from '../../types'
import { Props as InputProps } from '../FieldInputs/TextField/TextField.types'

export type Props = AddCSSprop<
  Omit<PickerStateProps<Nullable<Date>, Date>, 'size'>
> &
  UIKitSizeType &
  DayValidationProps<Date> &
  BaseDateValidationProps<Date> &
  Pick<
    InputProps,
    'helperText' | 'error' | 'labelText' | 'placeholder' | 'disabled'
  > &
  Pick<BaseDatePickerProps<Nullable<Date>, Date>, 'openTo' | 'views'> & {
    inputFormat?: string
    inputReadOnly?: boolean
  }

type ChangeDefault = (date: Nullable<Date>) => void
type OnChangeKeyboard = (
  value: Nullable<Date>,
  keyboardInputValue?: string | undefined,
) => void
export type MuiTypes = {
  onChange: ChangeDefault | OnChangeKeyboard
  onAccept: ChangeDefault
}
