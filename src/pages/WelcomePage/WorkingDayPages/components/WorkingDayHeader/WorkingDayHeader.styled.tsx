import { css } from '@emotion/react'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

export const stepTitleCSS = css`
  && {
    width: 65px;
    margin-right: 16px;
    color: ${theme.colors.pencil};
    cursor: pointer;
  }
`

export const ShiftTitleCSS = css`
  && {
    padding-top: 0;
  }
`

export const stepShiftTextCSS = css`
  && {
    width: 398px;
    font-family: Fira Sans;
    margin-top: 24px;
    font-weight: 600;
    color: ${theme.colors.black};
    font-size: 16px;
    line-height: 24px;
  }
`

export const backTextCSS = css`
  && {
    font-size: 14px;
    margin-left: 8px;
  }
`

export const switchButtonTextCSS = css`
  && {
    width: 478px;
    font-size: 14px;
    line-height: 24px;
    color: ${theme.colors.black};
  }
`

export const switchButtonLongTextCSS = css`
  && {
    width: 575px;
    font-size: 14px;
    line-height: 24px;
    color: ${theme.colors.black};
  }
`

export const switchButtonBoxCSS = css`
  && {
    margin-top: 10px;
    color: ${theme.colors.black};
  }
`

const ButtonSwitch = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 302px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.02em;
  text-align: center;
`

const Root = styled.div`
  width: 100%;
  position: relative;
`

const Header = styled.div`
  width: 100%;
  height: 114px;
`

export const Styled = { Root, ButtonSwitch, Header }
