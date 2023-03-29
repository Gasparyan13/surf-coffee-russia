import styled from '@common/styled'

import { theme } from '@providers/ThemeProvider/theme'

const Root = styled.div`
  width: 100%;
`

const TitleStep = styled.div`
  font-family: Fira Sans;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0.02em;
  color: ${theme.colors.black};
`

export const Styled = { Root, TitleStep }
