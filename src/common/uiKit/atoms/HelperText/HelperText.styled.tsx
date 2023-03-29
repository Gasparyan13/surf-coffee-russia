import { theme } from '@common/providers/ThemeProvider/theme'
import styled from '@common/styled'

import { Typography } from '../../components/Typography'
import * as T from './HelperText.types'

export const HelperText = styled(Typography)<{
  $disabled: T.Props['disabled']
  $error: T.Props['error']
}>`
  margin-top: 8px;
  color: ${({ $disabled, $error }) => {
    if ($error) return theme.colors.critical
    if ($disabled) return theme.colors.pencil
    return theme.colors.wetAsphalt
  }};
`
