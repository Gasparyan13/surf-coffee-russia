import { Tooltip, TooltipProps } from '@mui/material'
import React from 'react'

import { theme } from '@providers/ThemeProvider/theme'

type Props = TooltipProps & React.PropsWithChildren

export const MuiTooltip: React.FC<Props> = ({
  children,
  color = theme.colors.black,
  componentsProps,
  ...rest
}) => (
  <Tooltip
    componentsProps={{
      ...componentsProps,
      tooltip: {
        ...componentsProps?.tooltip,
        sx: {
          backgroundColor: color,
          color: theme.colors.white,
          borderRadius: '0 16px 16px 16px',
          fontWeight: 'bold',
          padding: '12px 16px',
          ...componentsProps?.tooltip?.sx,
        },
      },
    }}
    placement="bottom-start"
    {...rest}>
    {children}
  </Tooltip>
)
