import { css } from '@emotion/react'

import styled from '@common/styled'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const styleButton = css`
  && {
    margin-top: 50px;
    width: 20%;
  }
`

export const Styled = { Root }
