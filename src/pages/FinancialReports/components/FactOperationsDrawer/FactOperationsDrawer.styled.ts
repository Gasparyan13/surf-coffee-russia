import { css } from '@emotion/react'

import styled from '@common/styled'
import { BASIC_INDENT } from '@common/styled/variables'

import { theme } from '@providers/ThemeProvider/theme'

export const firstColumnCSS = css`
  && {
    padding-left: ${BASIC_INDENT};
  }
`
export const tooltipAnchorCSS = css`
  && {
    display: flex;
    align-items: center;
  }
`

export const criticalColumnCSS = css`
  color: ${theme.colors.critical};
`

export const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${BASIC_INDENT} 0 32px ${BASIC_INDENT};
`

export const CellIcon = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`

export const Root = styled.div`
  height: 100%;
  max-height: 100%;
`
