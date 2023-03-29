import { css } from '@emotion/react'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

export const titleStyleCSS = css`
  && {
    font-family: Fira Sans;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: ${theme.colors.asphalt};
  }
`

export const titleShiftCSS = css`
  && {
    font-family: Fira Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: ${theme.colors.black};
  }
`

export const deleteButtonCSS = css`
  && {
    font-family: Fira Sans;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.02em;
    text-align: center;
    margin-top: 40px;
    width: 282px;
    height: 40px;
    color: ${theme.colors.critical};
    border: 1px solid ${theme.colors.critical};
    border-radius: 16px;
    cursor: pointer;
    padding: 8px;
  }
`

const Root = styled.div`
  width: 330px;
  height: 224px;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 16px rgba(44, 44, 44, 0.12),
    0px 1px 40px rgba(44, 44, 44, 0.12);
`

const Content = styled.div`
  width: 100%;
  height: 64px;
  margin-top: 16px;
`

const CloseButton = styled.div`
  text-align: center;
  cursor: pointer;
`

export const Styled = { Root, CloseButton, Content }
