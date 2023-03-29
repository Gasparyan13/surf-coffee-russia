import { InputBaseComponentProps } from '@mui/material'
import { BooleanSchema } from 'yup'
import { RequiredStringSchema } from 'yup/lib/string'
import { AnyObject } from 'yup/lib/types'

export type Props = {
  label?: string
  value?: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  error?: string
  placeholder?: string
  inputProps?: InputBaseComponentProps
  disabled?: boolean
}

export type CreateValidationArg = {
  name?: string
  errorMessage?: string
  shouldValidateUniqueness?: boolean
  uniqueErrorMessage?: string
}

export type ValidationSchema = {
  [x: string]:
    | RequiredStringSchema<string | undefined, AnyObject>
    | BooleanSchema<boolean | undefined, AnyObject, boolean | undefined>
}
