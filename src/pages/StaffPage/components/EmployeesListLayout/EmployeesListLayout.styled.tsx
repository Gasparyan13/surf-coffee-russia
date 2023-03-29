import { css } from '@emotion/react'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

export const containerEmployeeAbsentCSS = css`
  && {
    margin: 0 auto;
  }
`
export const svgDocUnionCSS = css`
  && {
    height: 164px;
    text-align: center;
    color: ${theme.colors.asphaltSuperLight};
  }
`

export const Root = styled.div`
  height: calc(100vh - 235px);
`
