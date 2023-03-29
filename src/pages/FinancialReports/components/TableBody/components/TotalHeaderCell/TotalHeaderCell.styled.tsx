import styled from '@common/styled'

import { tableSidebarBoxShadow } from '../shared/styles'

export const Root = styled.div`
  > h4 {
    z-index: 10;
    padding: 29px 24px 5px;
    position: relative;
    text-align: right;
  }
  ${tableSidebarBoxShadow}
  background-color: ${({ theme }) => theme.colors.white};
`
