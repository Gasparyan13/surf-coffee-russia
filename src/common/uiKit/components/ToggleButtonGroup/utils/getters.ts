import { SxProps, Theme } from '@mui/material'

import { theme } from '@providers/ThemeProvider/theme'

import { Props as ToggleButtonProps } from '../ToggleButtonGroup.types'
import { HEIGHT_PRIMARY, HEIGHT_SECONDARY } from '../constants/sizes'

export const getTabIndicatorSXProps = (
  color: ToggleButtonProps['color'],
): SxProps<Theme> => ({
  height: color === 'secondary' ? HEIGHT_SECONDARY : HEIGHT_PRIMARY,
  bottom: '1px',
  backgroundColor:
    color === 'secondary' ? theme.colors.grey : theme.colors.black,
})

export const getTabsSXProps = (
  fullWidth: ToggleButtonProps['fullWidth'],
): SxProps<Theme> => ({
  display: fullWidth ? 'flex' : 'inline-flex',
  minHeight: 'auto',
})
