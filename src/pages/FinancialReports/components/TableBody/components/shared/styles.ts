import { css } from '@emotion/react'

import { theme } from '@providers/ThemeProvider/theme'

export type ReportTableSidebarCSS = {
  $isSelected?: boolean
  $hasChildren?: boolean
}

export const commonReportTableSidebar = ({
  $hasChildren,
  $isSelected,
}: ReportTableSidebarCSS) => {
  let cssString = ''
  if ($hasChildren) cssString += `cursor: pointer;`
  if ($isSelected)
    cssString += `background-color: ${theme.colors.grey};
                                height: 42px;`
  return css`
    ${cssString};
  `
}

export const commonHoverTitle = css`
  background-color: ${theme.colors.asphalt};
  color: ${theme.colors.white};
`

export const commonWidth = css`
  width: inherit;
  border-right: 1px solid ${theme.colors.asphaltLight};
`

export const tableSidebarBoxShadow = css`
  &:after {
    content: '';
    position: absolute;
    width: 0px;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    box-shadow: 1px 0px 5px 0.5px rgba(0, 0, 0, 0.16);
  }
`

export const sidebarCellText = css`
  line-height: 40px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.02em;
`
