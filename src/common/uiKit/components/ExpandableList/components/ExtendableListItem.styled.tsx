import { css } from '@emotion/react'

import { theme } from '@providers/ThemeProvider/theme'

export const contentContainerCSS = css`
  &:not(:first-of-type) {
    margin-top: 38px;
  }
`

export const itemContentCSS = css`
  && {
    padding: 16px;
    background-color: ${theme.colors.grey};
    border-radius: 16px;
  }
`
