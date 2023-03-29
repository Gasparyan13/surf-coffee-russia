import { MenuItemProps } from '@mui/material'
import React from 'react'

import { AddCSSKeyProps } from '../../../types/Generics'
import { UIKitSizeType } from '../../types'

export type Props = {
  text?: string | React.ReactNode
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  isSelected?: boolean
} & AddCSSKeyProps<MenuItemProps> &
  UIKitSizeType
