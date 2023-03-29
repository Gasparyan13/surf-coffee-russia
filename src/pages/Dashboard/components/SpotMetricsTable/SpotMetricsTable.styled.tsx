import { css } from '@emotion/react'

import { theme } from '@common/providers/ThemeProvider/theme'
import styled from '@common/styled'

import { Typography } from '@uiKit'
import { FONT_WEIGHT_SEMI_BOLD } from '@uiKit/constants/fontWeight'

import {
  METRICS_TABLE_HEADER_HEIGHT,
  METRICS_TABLE_TITLE_HEIGHT,
} from './constants/styles'

export const headerCellCSS = css`
  height: 40px;
  padding: 0;
  padding-bottom: 16px;
  vertical-align: baseline;
  && {
    border-bottom: 1px solid ${theme.colors.asphaltLight};
  }
`

export const firstColumnCSS = css`
  padding: 8px 0;
  vertical-align: initial;
  color: ${theme.colors.wetAsphalt};
  font-size: 13px;
`

export const Root = styled.div`
  height: calc(100% - ${METRICS_TABLE_HEADER_HEIGHT}px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const TableHeader = styled(Typography)`
  margin: 0 24px;
  text-transform: capitalize;
  font-weight: ${FONT_WEIGHT_SEMI_BOLD};
`

export const TableContainer = styled.div`
  height: calc(100% - ${METRICS_TABLE_TITLE_HEIGHT}px);
  max-height: 100%;
  width: 100%;
  display: flex;
`
