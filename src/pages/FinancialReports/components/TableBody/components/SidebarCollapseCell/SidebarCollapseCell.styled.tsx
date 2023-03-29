import { css } from '@emotion/react'

import { makeTruncatedTextDots } from '@common/common.styled'
import styled from '@common/styled'

import {
  commonHoverTitle,
  commonReportTableSidebar,
  commonWidth,
  ReportTableSidebarCSS,
  sidebarCellText,
} from '../shared/styles'

export const Icon = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2px;
`

export const CollapseCellContainer = styled.div<ReportTableSidebarCSS>`
  padding-right: 24px;

  display: flex;
  max-width: inherit;

  ${commonWidth}
  ${(props) => commonReportTableSidebar(props)}
  && {
    * {
      color: ${(props) => props.theme.colors.black};
    }

    &:hover {
      ${commonHoverTitle}

      * {
        font-weight: 500;
        ${commonHoverTitle}
      }

      * > svg > path {
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  }
`

export const tooltipBudgetCSS = css`
  width: -webkit-fill-available;
`

export const tooltipHasChildrenCSS = css`
  padding-right: 24px;
  padding-left: 8px;
`

export const Content = styled.div<{
  $isHighlighting?: boolean
  $isRoot?: boolean
  $hasNoIcon?: boolean
}>`
  ${sidebarCellText}
  height: 42px;
  width: auto;
  ${makeTruncatedTextDots}
  width: -webkit-fill-available;
  ${({ $isHighlighting, theme }) =>
    $isHighlighting ? `background-color: ${theme.colors.grey};` : ''}
  ${({ $isRoot, $hasNoIcon }) =>
    $isRoot
      ? `padding-left: ${$hasNoIcon ? '16px' : 0};`
      : 'padding-left: 32px;'}
`
