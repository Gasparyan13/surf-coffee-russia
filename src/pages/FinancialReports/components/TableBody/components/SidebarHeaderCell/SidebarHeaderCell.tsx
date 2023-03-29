import React from 'react'

import * as Styled from './SidebarHeaderCell.styled'
import * as T from './SidebarHeaderCell.types'

export const SidebarHeaderCell: React.FC<T.Props> = ({ title }) =>
  !title ? <Styled.Empty /> : <Styled.Title>{title}</Styled.Title>
