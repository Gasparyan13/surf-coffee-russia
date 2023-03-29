import { css } from '@emotion/react'

import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

import { TextVariantProps } from './CellText.types'

export const AddCost = styled.div`
  background-color: ${theme.colors.asphalt};
  margin: 3px 24px 0 0;
`

export const manualSumCSS = css`
  margin-top: -5px;
  font-size: 12px;
  color: ${theme.colors.pencil};
`

const commonDisabledColorCSS = ({ disabled }: TextVariantProps) => css`
  ${disabled ? `color: #979797` : ``}// TODO цвета нет в палитре
`

export const BoldText = styled.div<TextVariantProps>`
  font-family: 'Fira Sans';

  font-weight: 700;
  font-size: 14px;
  color: ${theme.colors.black};
  position: relative;
  ${commonDisabledColorCSS}
`

export const TitleText = styled.div<TextVariantProps>`
  font-family: 'Fira Sans';

  font-weight: 400;
  font-size: 14px;
  color: ${theme.colors.black};
  position: relative;
  ${commonDisabledColorCSS}
`

export const RegularText = styled.div<TextVariantProps>`
  font-family: 'Fira Sans';

  font-weight: 400;
  font-size: 14px;
  color: ${theme.colors.black};
  position: relative;
  ${commonDisabledColorCSS}
`
