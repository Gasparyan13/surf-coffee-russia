import { css } from '@emotion/react'

import { theme } from '@providers/ThemeProvider/theme'

const SIZE = '392px'

export const counterpartiesCSS = css`
  max-height: ${SIZE};
  overflow-y: auto;
  margin-top: 7px;
  border-bottom: 1px solid ${theme.colors.asphaltSuperLight};
`

export const searchCounterpartiesCSS = css`
  && {
    width: ${SIZE};
    height: 48px;
    .MuiInputAdornment-root {
      color: ${theme.colors.pencil};
    }
  }
`

export const counterpartiesChildCSS = css`
  width: 100%;
  cursor: pointer;
  color: ${theme.colors.white};

  &:hover {
    background-color: ${theme.colors.asphalt};
    transition: 0.1s ease-in-out;

    span {
      color: ${theme.colors.white};
    }
  }
`

export const contractorAliasCSS = css`
  height: 48px;
  padding: 12px 0 0 16px;
`
