import { css } from '@emotion/react'

import { theme } from '@providers/ThemeProvider/theme'

export const totalContentCSS = css`
  && {
    display: flex;
    justify-content: space-between;
    max-width: 304px;
    margin: 24px;
    padding: 12px 16px;
    background-color: ${theme.colors.grey};
    border-radius: 16px;
  }
`
