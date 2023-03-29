import { css } from '@emotion/react'
import Button from '@mui/material/Button/Button'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

import { UIKitSizeType } from '../../types'

export const buttonBaseCSS = css`
  && {
    border: none;
  }
`

export const criticalButtonCSS = css`
  && {
    border: 1px solid ${theme.colors.critical};
    background-color: ${theme.colors.white};
    color: ${theme.colors.critical};
    &:hover {
      background-color: ${theme.colors.critical};
      color: ${theme.colors.white};
    }
    &:active {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
        ${theme.colors.critical};
    }
  }
`

export const contextButtonCSS = css`
  && {
    background-color: ${theme.colors.grey};
    color: ${theme.colors.black};
    height: 32px;
  }
`
export const buttonAutoCSS = css`
  && {
    .MuiButton-startIcon {
      margin-left: 0;
      margin-right: 0;
    }
  }
`

export const MuiButton = styled(Button)<{
  $buttonSize: UIKitSizeType['size']
}>`
  && {
    ${({ $buttonSize }) => {
      if ($buttonSize === 'flex') return ``
      if ($buttonSize === 'auto')
        return `
          gap: 10px;
          min-width: auto;
          ${buttonAutoCSS}
        `
      if ($buttonSize === 'small') return `width: 120px;`
      if ($buttonSize === 'large') return 'width: 320px;'
    }}
  }
`
