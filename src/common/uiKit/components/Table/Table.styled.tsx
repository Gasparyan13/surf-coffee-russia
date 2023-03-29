import { css } from '@emotion/react'

import { theme } from '@providers/ThemeProvider/theme'

export const baseTableRowCSS = css`
  .MuiTableCell-root {
    border-bottom: 1px solid ${theme.colors.asphaltSuperLight};
  }
  letter-spacing: 0.02em;
`
