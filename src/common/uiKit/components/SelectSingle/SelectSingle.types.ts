import { SelectProps } from '@mui/material'

import { UIKitSizeType } from '../../types'
import { Props as ListRowProps } from '../ListRow/ListRow.types'

export type IconProps = { className: string }

export type Props = {
  menus: ListRowProps[]
  menuHeight?: number
  helperText?: string
  IconComponent?: (iconProps: IconProps) => JSX.Element
  onChange?: (value: string) => void
  labelText?: string
} & Omit<SelectProps, 'size' | 'onChange' | 'IconComponent'> &
  UIKitSizeType
