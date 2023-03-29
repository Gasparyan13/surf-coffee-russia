import { css } from '@emotion/react'

import { theme } from '@providers/ThemeProvider/theme'

import { transitionCSS } from '../../../../../common.styled'
import { baseTableRowCSS } from '../../Table.styled'

export const tableRowCSS = css`
  && {
    ${baseTableRowCSS}
    &:hover {
      background-color: ${theme.colors.asphalt};
      cursor: pointer;
      * {
        color: ${theme.colors.white};
      }
    }
    ${transitionCSS}
  }
`
