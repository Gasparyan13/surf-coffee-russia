import { css } from '@emotion/react'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

import { commonHoverTitle } from '../shared/styles'

export const tooltipTitleCSS = css`
  font-weight: bold;
  color: ${theme.colors.white};
`

export const tooltipContentCSS = css`
  && {
    width: 385px;
    color: ${theme.colors.white};
  }
`

export const EmptyRow = styled.div`
  height: 5px;
  width: 5px;
`

export const InfoIcon = styled.div<{
  $isFirstLevel: boolean
  $color: string
  $hoverColor: string
}>`
  > svg > path {
    fill: ${({ $color }) => $color};
  }

  &:hover {
    ${commonHoverTitle}

    > svg > path {
      fill: ${({ $hoverColor }) => $hoverColor};
    }

    * {
      font-weight: 500;
      ${commonHoverTitle}
    }
  }
  margin: ${(props) =>
    props.$isFirstLevel ? `7px 0 0 9px` : `9px 2px 0 12px`};
`
