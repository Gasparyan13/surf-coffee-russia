import { Grid } from '@mui/material'
import React from 'react'

import { Styled } from './TitleStep.styled'
import * as T from './TitleStep.types'

export const TitleStep: React.FC<T.Props> = ({ children, title }) => {
  return (
    <Styled.Root>
      <Grid alignItems="center" display="flex" justifyContent="space-between">
        <Grid alignItems="center" display="flex" justifyContent="space-between">
          {children}
          <Styled.TitleStep>{title}</Styled.TitleStep>
        </Grid>
      </Grid>
    </Styled.Root>
  )
}
