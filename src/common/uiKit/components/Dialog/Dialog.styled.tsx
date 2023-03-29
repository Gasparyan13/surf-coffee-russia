import { css } from '@emotion/react'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

const Content = styled.div``

export const errorTextCSS = css`
  && {
    color: ${theme.colors.critical};
  }
`

export const borderBottomCSS = css`
  && {
    border-bottom: 1px solid ${theme.colors.asphaltSuperLight};
  }
`

const Root = styled.div`
  position: relative;
`
const IconLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`
const IconRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`

export const Styled = { Root, Content, IconLeft, IconRight }
