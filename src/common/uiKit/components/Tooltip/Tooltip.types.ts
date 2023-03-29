import { SerializedStyles } from '@emotion/react'
import { TooltipProps } from '@mui/material'
import React from 'react'

import { TOOLTIP_CONFIG } from './constants'

export type TooltipPlacement = keyof typeof TOOLTIP_CONFIG

export type Props = {
  placement: TooltipPlacement
  children: React.ReactNode
  anchorCss?: SerializedStyles
} & Omit<TooltipProps, 'placement' | 'children'>
