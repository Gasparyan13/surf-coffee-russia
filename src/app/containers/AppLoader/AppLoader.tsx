import { CircularProgress } from '@mui/material'
import React from 'react'

import * as Styled from './AppLoader.styled'

export const AppLoader: React.FC = () => (
  <Styled.Root>
    <CircularProgress />
  </Styled.Root>
)
