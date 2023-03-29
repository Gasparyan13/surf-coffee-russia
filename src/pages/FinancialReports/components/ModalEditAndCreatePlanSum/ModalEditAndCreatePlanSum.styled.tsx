import { css } from '@emotion/react'

import { theme } from '@providers/ThemeProvider/theme'

export const patchButtonSumCSS = css`
  && {
    border-radius: 16px;
    text-align: center;
    width: 392px;
    font-family: Fira Sans;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    cursor: pointer;
    height: 48px;
    padding: 10px;
    color: ${theme.colors.white};
    background-color: ${theme.colors.black};
    &:hover {
      background-color: ${theme.colors.black};
    }
  }
`
