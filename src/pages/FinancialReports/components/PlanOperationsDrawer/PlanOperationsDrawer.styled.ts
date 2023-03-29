import { css } from '@emotion/react'

import styled from '@common/styled'
import { BASIC_INDENT } from '@common/styled/variables'

import { Typography } from '@uiKit'

export const firstColumnCSS = css`
  && {
    padding-left: ${BASIC_INDENT};
  }
`

export const Root = styled.div`
  height: 100%;
  max-height: 100%;
`

export const FooterRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

export const TotalTextContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const TotalSum = styled(Typography)`
  font-size: 18px;
  font-weight: 500;
  text-align: right;
  margin-left: 8px;
`
