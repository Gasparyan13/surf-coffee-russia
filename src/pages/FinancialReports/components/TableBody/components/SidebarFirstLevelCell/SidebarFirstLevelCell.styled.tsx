import {
  commonFontStyleCSS,
  makeTruncatedTextDots,
} from '@common/common.styled'
import styled from '@common/styled'

import {
  commonHoverTitle,
  commonReportTableSidebar,
  commonWidth,
  ReportTableSidebarCSS,
  sidebarCellText,
} from '../shared/styles'

export const FirstLevelCellTitle = styled.div<ReportTableSidebarCSS>`
  ${commonFontStyleCSS}
  &:hover {
    ${commonHoverTitle}
  }
  ${sidebarCellText}
  text-transform: uppercase;
  height: 42px;
  ${makeTruncatedTextDots}
  color: ${({ theme }) => theme.colors.wetAsphalt};
`
export const FirstLevelCellContainer = styled.div<ReportTableSidebarCSS>`
  ${commonFontStyleCSS}
  ${commonWidth}

  display: flex;
  max-width: inherit;
  ${sidebarCellText}
  padding: 0 24px 0 16px;
  text-transform: uppercase;
  height: 42px;
  ${makeTruncatedTextDots}
  ${(props) => commonReportTableSidebar(props)}

  &:hover {
    ${commonHoverTitle}
    * {
      ${commonHoverTitle}
    }
    * > svg > path {
      fill: ${({ theme }) => theme.colors.white};
    }
  }

  color: ${({ theme }) => theme.colors.wetAsphalt};
`
