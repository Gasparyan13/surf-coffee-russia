import { css } from '@emotion/react'

import { theme } from '@providers/ThemeProvider/theme'

export const dialogShiftLinkCSS = css`
  && {
    color: ${theme.colors.critical};
    margin: 7px auto 0;
    cursor: pointer;
  }
`
