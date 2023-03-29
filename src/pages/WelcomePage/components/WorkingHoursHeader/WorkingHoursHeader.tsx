import { Grid } from '@mui/material'
import React from 'react'

import { heightInheritCSS } from '@common/common.styled'

import { HeaderSpot } from '@pages/WelcomePage/components/HeaderSpot'

import { Styled } from './WorkingHoursHeader.styled'

export const WorkingHoursHeader: React.FC = () => {
  return (
    <Styled.Root>
      <Grid container css={heightInheritCSS} justifyContent="space-between">
        <Grid item xs={12}>
          <HeaderSpot />
        </Grid>
      </Grid>
    </Styled.Root>
  )
}
