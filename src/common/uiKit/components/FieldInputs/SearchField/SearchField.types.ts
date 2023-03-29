import { Props as InputProps } from '../TextField/TextField.types'

export type Props = {
  delayTime?: number
  value?: string
  onChange?: (value: string) => void
} & Omit<InputProps, 'InputProps' | 'onChange' | 'value' | 'defaultValue'>
