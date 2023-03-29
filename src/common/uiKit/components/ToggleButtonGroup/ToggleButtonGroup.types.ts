import { TabsTypeMap, TabTypeMap, ToggleButtonProps } from '@mui/material'

import { AddCSSKeyProps } from '../../../types/Generics'

export type StyledProps = {
  isDisabled?: boolean
  isCurrentTab?: boolean
} & AddCSSKeyProps<ToggleButtonProps>

export type Props = {
  tabs: TabTypeMap['props'][]
  currentValue: number | string
  color?: 'primary' | 'secondary'
  disabled?: boolean
  fullWidth?: boolean
} & Omit<TabsTypeMap['props'], 'indicatorColor'>
