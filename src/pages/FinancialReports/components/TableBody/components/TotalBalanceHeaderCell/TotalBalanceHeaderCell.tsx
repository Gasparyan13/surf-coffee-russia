import React from 'react'

import { Typography } from '@common/uiKit'

import * as Styled from './TotalBalanceHeaderCell.styled'
import * as T from './TotalBalanceHeaderCell.types'

export const TotalBalanceHeaderCell: React.FC<T.Props> = ({ title }) => (
  <Styled.Root>
    <Typography variant="H4">{title}</Typography>
  </Styled.Root>
)
