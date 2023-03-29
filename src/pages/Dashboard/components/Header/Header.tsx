import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

import { heightInheritCSS } from '@common/common.styled'
import { theme } from '@common/providers/ThemeProvider/theme'

import { ButtonLogout } from '@components'

import { Typography } from '@uiKit'

import { getUserName } from '@store/deprecated/modules/app/selectors'

import * as Styled from './Header.styled'

export const Header: React.FC = () => {
  const userName = useSelector(getUserName)

  return (
    <Styled.Root>
      <Grid container css={heightInheritCSS} justifyContent="space-between">
        <Grid item>
          <Typography variant="H2">Здравствуйте, {userName}!</Typography>
          <Typography color={theme.colors.wetAsphalt} variant="PBody">
            Отличный день, чтобы перевыполнить план по выручке!
          </Typography>
        </Grid>
        <Grid item>
          <ButtonLogout />
        </Grid>
      </Grid>
    </Styled.Root>
  )
}
