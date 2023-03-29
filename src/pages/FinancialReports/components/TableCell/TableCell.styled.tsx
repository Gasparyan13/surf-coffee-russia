import { css } from '@emotion/react'

import { transitionCSS } from '@common/common.styled'
import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

import { TableColumnType } from '../TableRow/TableRow.types'

export type CellType = {
  $isAddIcon?: boolean
  $isCurrentMonth?: boolean
  $isHoverable?: boolean
  $tableColumnType: TableColumnType
}

const hoverCSS = css`
  &:hover {
    .table-icon {
      color: ${theme.colors.white};
      font-weight: bold;

      * {
        fill: ${theme.colors.white};
      }
    }
    cursor: pointer;
    font-weight: 700;
    background-color: ${`${theme.colors.asphalt} !important`};
  }
`

export const Root = styled.div<CellType>`
  position: relative;
  padding-right: 24px;
  width: 110px;
  height: 42px;

  ${({ $isAddIcon }) => {
    if ($isAddIcon)
      return `
        &:hover {
          background-color: ${theme.colors.asphalt} !important;
          cursor: pointer;
        }

        & > div {
          opacity: 0;
        }

        &:hover > div {
          ${transitionCSS}
          opacity: 1;
        }
      `

    return ''
  }}

  ${({ $isHoverable }) => {
    if ($isHoverable) return hoverCSS
  }}

  ${({ $isCurrentMonth, $tableColumnType }) => {
    if ($isCurrentMonth)
      return `background-color: ${theme.colors.asphaltSuperLight}`
    if ($tableColumnType === 'MAIN')
      return `
      background-color: #fafafb;
      `
  }}
`
