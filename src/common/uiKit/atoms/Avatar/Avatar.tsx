import React from 'react'

import * as Styled from './Avatar.styled'
import * as T from './Avatar.types'

export const Avatar: React.FC<T.Props> = ({ color = 'primary', ...props }) => (
  <Styled.Avatar $color={color} {...props} />
)
