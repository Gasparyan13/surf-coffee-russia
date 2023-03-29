import { Nullable } from '../../../../types/Nullable'
import { Props as TooltipProps } from '../../Tooltip/Tooltip.types'
import { Props as InputProps } from '../TextField/TextField.types'

export type Props = {
  value: Nullable<File>
  onChange: (file: Nullable<File>) => void
  onError?: (hasError: boolean) => void
  tooltipPlacement?: TooltipProps['placement']
  testId?: string
} & Omit<InputProps, 'value' | 'onChange' | 'onError' | 'InputProps'>
