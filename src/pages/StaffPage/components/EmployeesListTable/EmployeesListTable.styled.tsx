import { css } from '@emotion/react'

import { centerCSS } from '@common/common.styled'
import styled from '@common/styled'

export const Root = styled.div`
  position: relative;
`

export const Loader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: white;
  & > * {
    ${centerCSS}
  }
`

export const Spinner = styled.div`
  ${centerCSS}
`

export const rateCellCSS = css`
  && {
    padding-left: 24px;
  }
`
