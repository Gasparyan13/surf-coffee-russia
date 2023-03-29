import { css } from '@emotion/react'

import { theme } from '@common/providers/ThemeProvider/theme'
import styled from '@common/styled'
import { BASIC_INDENT } from '@common/styled/variables'

export const headerCSS = css`
  & > tr > th {
    height: 32px;
    vertical-align: baseline;
    padding: 0 15px 14px 16px;
    && {
      border-bottom: 1px solid ${theme.colors.asphaltSuperLight};
    }

    &:first-of-type {
      padding-left: ${BASIC_INDENT};
    }

    &:last-of-type {
      padding-right: ${BASIC_INDENT};
    }
  }
`

export const bodyCSS = css`
  & > tr > td {
    &:first-of-type {
      padding-left: ${BASIC_INDENT};
    }

    &:last-of-type {
      padding-right: ${BASIC_INDENT};
    }
  }

  && > tr:last-of-type > td {
    border-bottom: 0;
  }
`

export const Root = styled.div`
  height: 100%;
  max-height: 100%;
  width: 100%;
  display: flex;
  border: 1px solid ${theme.colors.asphaltSuperLight};
  border-radius: 16px;
  padding-top: 14px;
  user-select: none;
`
