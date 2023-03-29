import styled from '@common/styled'

import { redTextCSS } from '../../common.styled'

const Root = styled.div`
  position: relative;
`
const RequiredSymbol = styled.div`
  && {
    position: absolute;
    left: -15px;
    top: 25%;
  }
  ${redTextCSS};
`

export const Styled = { Root, RequiredSymbol }
