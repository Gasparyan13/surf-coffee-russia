import { css, SerializedStyles } from '@emotion/react'

import { transitionCSS } from '@common/common.styled'
import styled from '@common/styled'

import {
  CURRENT_MONTH_CELL_SELECTOR,
  MAIN_CONTENT_CELL_SELECTOR,
} from './constants/classNames'

export const tableHeightCSS = css`
  && {
    height: 80vh;
    max-height: calc(100vh - 166px);
  }
`

export const Loader = styled.div`
  && {
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const fullWidthShadowCSS = css`
  box-shadow: 0px 6px 19px rgba(44, 44, 44, 0.1);
`

type OverwriteCSS = { $cssOverwrite?: SerializedStyles }

export const Root = styled.div<OverwriteCSS>`
  height: calc(100vh - 190px);
  overflow: hidden;
  position: relative;
  border-radius: 16px 0px 0px 0px;
  padding-left: 25px;
  ${({ $cssOverwrite }) => $cssOverwrite}
`

export const TableContainer = styled.div<OverwriteCSS>`
  && {
    .public_fixedDataTableCell_cellContent {
      padding: 0;
    }
    .public_fixedDataTable_header,
    .public_fixedDataTable_scrollbarSpacer,
    .public_fixedDataTable_header .public_fixedDataTableCell_main {
      background-color: ${({ theme }) => theme.colors.white};
      background-image: none;
    }
    .public_fixedDataTableRow_highlighted,
    .public_fixedDataTableRow_highlighted .public_fixedDataTableCell_main {
      background-color: ${({ theme }) => theme.colors.white};
    }

    .public_fixedDataTableRow_main:not(.public_fixedDataTable_header):hover
      .public_fixedDataTableCell_main {
      .${CURRENT_MONTH_CELL_SELECTOR} {
        background-color: #e1e3e8; // TODO цвета нет в палитре;
        ${transitionCSS}
      }
      .${MAIN_CONTENT_CELL_SELECTOR} {
        background-color: ${({ theme }) => theme.colors.grey};
        ${transitionCSS}
      }
      background-color: ${({ theme }) => theme.colors.grey};
      ${transitionCSS}
    }

    .ScrollbarLayout_mainVertical {
      height: 100% !important;
      border: none;
    }
    .public_fixedDataTable_scrollbarSpacer {
      height: 0 !important;
    }

    .public_Scrollbar_mainOpaque {
      border: none !important;
    }

    .public_fixedDataTableCell_main {
      border: none;
    }
    .public_fixedDataTable_header {
      border: none;
    }
    .public_fixedDataTable_main {
      border: none;
    }
    .public_fixedDataTable_topShadow {
      display: none;
    }

    .public_fixedDataTable_bodyRow.fixedDataTableLayout_hasBottomBorder.public_fixedDataTable_hasBottomBorder,
    .fixedDataTableRowLayout_main.public_fixedDataTableRow_main.public_fixedDataTableRow_even.public_fixedDataTable_bodyRow.fixedDataTableLayout_hasBottomBorder.public_fixedDataTable_hasBottomBorder {
      border-bottom: none;
    }

    .public_fixedDataTable_horizontalScrollbar {
      border-top: 1px solid #d3d3d3; // TODO цвета нет в палитре;
    }

    ${({ $cssOverwrite }) => $cssOverwrite}
  }
`
