import { Grid } from '@mui/material'
import React from 'react'

import { ButtonLogout } from '@components'

import { TitleStep } from '@pages/WelcomePage/components/TitleStep'

import { Styled } from './HeaderSpot.styled'

export const HeaderSpot: React.FC = () => {
  return (
    <Styled.Root>
      <Grid container justifyContent="space-between">
        <Grid item xs={6}>
          <TitleStep title="Настройка спота" />
        </Grid>
        <Grid item>
          <ButtonLogout />
        </Grid>
      </Grid>
    </Styled.Root>
  )
}
