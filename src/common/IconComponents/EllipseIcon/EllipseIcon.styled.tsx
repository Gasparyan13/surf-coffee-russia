import styled from '@common/styled'

import * as T from './EllipseIcon.types'

export const Ellipse = styled.span<{ $color: T.Props['color'] }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid;
  box-sizing: border-box;
  ${({ $color }) => ($color ? `color: ${$color};` : ``)}
`
