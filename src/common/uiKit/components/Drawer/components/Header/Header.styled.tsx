import { css } from '@emotion/react'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

import { FONT_WEIGHT_BOLD } from '@uiKit/constants/fontWeight'

import { Typography } from '../../../Typography'
import {
  BASIC_CONTENT_INDENT,
  INDENT_RIGHT_IN_DRAWER,
} from '../../constants/styles'

export const Header = styled.header`
  margin: ${BASIC_CONTENT_INDENT};
  padding-right: ${INDENT_RIGHT_IN_DRAWER}px;
`

export const BackButton = styled(Typography)`
  width: min-content;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${theme.colors.asphalt};
  margin-bottom: 10px;
`

export const headerDateCSS = css`
  && {
    font-weight: ${FONT_WEIGHT_BOLD};
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: ${theme.colors.wetAsphalt};
    margin-bottom: 8px;
    text-transform: capitalize;
  }
`

export const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const CloseIcon = styled.div<{ $addMargin: boolean }>`
  ${({ $addMargin }) => ($addMargin ? 'margin: 20px;' : '')}
  cursor: pointer;
  height: 24px;
`
