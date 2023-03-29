import { css } from '@emotion/react'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

import { makeBlurFooterCSS } from '../../../../../common/common.styled'

export const dayTitleCSS = css`
  && {
    color: ${theme.colors.black};
    font-size: 18px;
    margin: 24px 0 0 24px;
    cursor: pointer;
  }
`

export const daySubTitleCSS = css`
  && {
    font-size: 14px;
    color: ${theme.colors.asphalt};
    margin: 8px 24px 0 24px;
    cursor: pointer;
  }
`

export const calendarGridCSS = css`
  && {
    max-height: 65vh;
  }
`

export const buttonStyleCSS = css`
  && {
    width: 302px;
    height: 48px;
    margin-right: 24px;
  }
`

const Root = styled.div`
  position: relative;
  width: -webkit-fill-available;
  height: calc(100% - 242px);
`

const Footer = styled.div`
  ${makeBlurFooterCSS()}
`

const ButtonNext = styled.button`
  width: 302px;
  height: 48px;
  background-color: ${(props) => props.theme.colors.black};
  color: ${(props) => props.theme.colors.white};
  border-radius: 16px;
`

const BoxAllDay = styled.div`
  width: 350px;
  height: 607px;
  border: 1px solid #f4f4f4;
  margin-top: 36px;
`
export const Styled = { Root, Footer, ButtonNext, BoxAllDay }
