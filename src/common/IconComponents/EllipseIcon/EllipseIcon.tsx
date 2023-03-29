import React from 'react'

import * as Styled from './EllipseIcon.styled'
import * as T from './EllipseIcon.types'

export const EllipseIcon: React.FC<T.Props> = ({ color, ...props }) => (
  <Styled.Ellipse $color={color} {...props} />
)
