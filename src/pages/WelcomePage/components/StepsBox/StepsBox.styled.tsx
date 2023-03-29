import { css } from '@emotion/react'

import styled from '@common/styled'

import { makeDivBlurred } from '../../../../common/common.styled'
import { theme } from '../../../../common/providers/ThemeProvider/theme'

type BlurredCSS = { blurred?: boolean }

export const textBoxCSS = css`
  && {
    font-family: Fira Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: 0.02em;
    color: ${theme.colors.blackDark};
  }
`

const Root = styled.div`
  width: 788px;
  height: 45vh;
  margin-top: 30px;
`

const StepBox = styled.div<BlurredCSS>`
  && {
    position: relative;
    width: 379px;
    border-radius: 16px;
    height: 221px;
    color: ${(props) => props.theme.colors.asphalt};
    border: 1px solid #dce4e9;
    background-color: ${(props) => props.theme.colors.asphaltSuperLight};
    &:hover {
      background-color: #f1f3f9;
    }
    ${(props) => (props.blurred ? makeDivBlurred(2) : '')}
    cursor: pointer;
    transition: 0.35s ease-in;
  }
`
const TitleBox = styled.div<BlurredCSS>`
  width: 120px;
  height: 64px;
  position: absolute;
  left: 33px;
  bottom: 32px;
  z-index: 1;
`
const SvgCard = styled.div`
  position: absolute;
  top: 0;
  right: 0px;
`

export const Styled = { Root, StepBox, TitleBox, SvgCard }
