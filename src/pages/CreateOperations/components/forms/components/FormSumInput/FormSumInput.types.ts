import { Nullable } from '@common/types/Nullable'

import { Props as CurrencyInputProps } from '@uiKit/components/FieldInputs/CurrencyField/CurrencyField.types'

export type Props = {
  label?: string
  value: Nullable<string>
  onChange: CurrencyInputProps['onChange']
  placeholder?: string
  error?: string
  disabled?: boolean
}
