import React from 'react'

import * as Styled from './FormRowLayout.styled'
import * as T from './FormRowLayout.types'

export const FormRowLayout: React.FC<T.Props> = ({ children }) => (
  <Styled.Root>{children}</Styled.Root>
)
