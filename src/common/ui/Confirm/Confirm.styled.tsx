import styled from '@common/styled'

import { borderRadiusCSS } from '../../common.styled'

const Root = styled.div`
  padding: 15px 20px;
  background-color: ${(props) => props.theme.colors.grey};
  ${borderRadiusCSS}
`

export const Styled = { Root }
