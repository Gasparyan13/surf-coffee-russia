import { SerializedStyles } from '@emotion/react'

import styled from '@common/styled'

export const Anchor = styled.div<{ $css?: SerializedStyles }>`
  ${({ $css }) => $css || ''}
`
