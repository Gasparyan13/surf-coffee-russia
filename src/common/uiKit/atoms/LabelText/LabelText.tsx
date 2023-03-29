import React from 'react'

import { theme } from '@common/providers/ThemeProvider/theme'

import { Typography } from '../../components/Typography'
import * as T from './LabelText.types'

export const LabelText: React.FC<T.Props> = ({ disabled, ...rest }) => (
  <Typography
    {...rest}
    color={disabled ? theme.colors.pencil : theme.colors.wetAsphalt}
    variant="LabelBold"
  />
)
