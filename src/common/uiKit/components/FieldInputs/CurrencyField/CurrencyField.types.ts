import { CurrencyInputProps } from 'react-currency-input-field'

import { Props as InputProps } from '../TextField/TextField.types'

export type Props = {
  decimalSeparator?: string
  decimalsLimit?: number
  integerLimit?: number
  groupSeparator?: string
  onChange: CurrencyInputProps['onValueChange']
} & Omit<InputProps, 'InputProps' | 'onChange'>
