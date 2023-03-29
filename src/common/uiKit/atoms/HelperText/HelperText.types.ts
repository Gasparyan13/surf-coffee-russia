import { Props as TypographyProps } from '../../components/Typography/Typography.types'

export type Props = {
  error?: boolean
  disabled?: boolean
} & Omit<TypographyProps, 'variant' | 'color'>
