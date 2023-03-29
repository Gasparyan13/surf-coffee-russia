import { css } from '@emotion/react'

import styled from '@common/styled'

export const titleDialogCSS = css`
  && {
    font-family: Fira Sans;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.02em;
  }
`
const Content = styled.div``

const Root = styled.div`
  width: 392px;
  padding-bottom: 21px;
  border-bottom: 1px solid ${(props) => props.theme.colors.asphaltSuperLight};
`

export const Styled = { Root, Content }
