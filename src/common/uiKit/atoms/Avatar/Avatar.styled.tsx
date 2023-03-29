import MuiAvatar from '@mui/material/Avatar'

import styled from '@common/styled'

import * as T from './Avatar.types'

export const Avatar = styled(MuiAvatar)<{ $color: T.Props['color'] }>`
  && {
    ${({ $color, theme }) => {
      if ($color === 'primary')
        return `
          background-color: ${theme.colors.wetAsphalt};
          color: ${theme.colors.white};
          `
      if ($color === 'error')
        return `
          background-color: ${theme.colors.critical};
          color: ${theme.colors.white};
          `
    }}
  }
`
