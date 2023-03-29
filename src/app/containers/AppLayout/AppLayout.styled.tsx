import styled from '@common/styled'
import { BASIC_PADDING_LAYOUT } from '@common/styled/variables'

import { theme } from '@providers/ThemeProvider/theme'

const Root = styled.div`
  height: 100vh;
  margin: auto;
  background-color: ${theme.colors.white};
`

const Content = styled.div`
  height: 100%;
  padding: ${BASIC_PADDING_LAYOUT} ${BASIC_PADDING_LAYOUT} 0 25px;
`

export const Styled = { Root, Content }
