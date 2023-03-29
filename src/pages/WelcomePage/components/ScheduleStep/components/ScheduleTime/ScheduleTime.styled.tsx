import { css } from '@emotion/react'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

export const selectTimeCSS = css`
  && {
    font-family: Fira Sans;
    width: 139px;
    height: 48px;
    border-radius: 16px;
    background: ${theme.colors.white};
  }
`

export const formStyleTimeCSS = css`
  && {
    height: 390px;
  }
`

const Root = styled.div``

const TitleShift = styled.div`
  font-family: Fira Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0.02em;
  text-align: left;
  height: 32px;
`

const TitleDay = styled.div`
  font-family: Fira Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.02em;
  text-align: left;
  color: ${theme.colors.black};
  margin: 24px 0;
`

export const buttonSaveCSS = css`
  && {
    width: 302px;
  }
`

export const Styled = { Root, TitleShift, TitleDay }
