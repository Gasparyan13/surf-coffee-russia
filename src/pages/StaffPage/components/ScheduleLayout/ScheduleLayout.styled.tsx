import styled from '@common/styled'
import { BASIC_PADDING_LAYOUT } from '@common/styled/variables'

export const Root = styled.div`
  height: calc(100vh - (${BASIC_PADDING_LAYOUT} * 2 + 112px));
`

export const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`
