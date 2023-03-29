import { css } from '@emotion/react'

import { theme } from '@providers/ThemeProvider/theme'

export const currencyInputCSS = css`
  && {
    .Mui-disabled {
      .MuiInputAdornment-root {
        color: ${theme.colors.pencil};
      }
    }
  }
`
