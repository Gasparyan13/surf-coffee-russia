import { Props as TypographyProps } from '../../components/Typography/Typography.types'

export type Props = {
  disabled?: boolean
} & Omit<TypographyProps, 'variant' | 'color'>
