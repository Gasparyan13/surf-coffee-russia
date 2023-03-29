import styled from '@common/styled'

import { Typography } from '@uiKit'

export const Root = styled.div<{ $hasBorder?: boolean }>`
  width: inherit;
  height: inherit;
  display: flex;
  border-right: none;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 1;
  ${({ $hasBorder, theme }) =>
    $hasBorder ? `border-right: 1px solid ${theme.colors.asphaltLight};` : ''}
`

export const Placeholder = styled(Typography)`
  width: 200px;
  color: ${({ theme }) => theme.colors.pencil};
`
