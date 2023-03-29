import BooleanSchema from 'yup/lib/boolean'
import { AnyObject } from 'yup/lib/object'
import StringSchema from 'yup/lib/string'

import { Props as CurrencyInputProps } from '@uiKit/components/FieldInputs/CurrencyField/CurrencyField.types'

export type Props = {
  label?: string
  value: string
  onChange: CurrencyInputProps['onChange']
  disabled: CurrencyInputProps['disabled']
  placeholder?: string
  error?: string
}

export type ValidationSchema = {
  [x: string]:
    | StringSchema<string | undefined, AnyObject>
    | BooleanSchema<boolean | undefined, AnyObject, boolean | undefined>
}
