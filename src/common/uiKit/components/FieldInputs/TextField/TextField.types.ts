import { TextFieldProps } from '@mui/material/TextField'

import { UIKitSizeType } from '../../../types'

export type Props = {
  labelText?: string
} & Omit<TextFieldProps, 'size'> &
  UIKitSizeType
