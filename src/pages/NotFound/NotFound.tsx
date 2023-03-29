import { Button, Grid, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import { Helmet } from 'react-helmet-async'

import { APP_NAME, PATHS } from '@constants'

import { useHandleRedirect } from '@hooks'

import { Styled } from './NotFound.styled'

const caption = 'Страница не найдена'

export const NotFound: React.FC = () => {
  const handleRedirect = useHandleRedirect()

  const handleGoToDashboard = useCallback(() => {
    handleRedirect(PATHS.main)
  }, [])

  return (
    <Styled.Root>
      <Helmet defer={false}>
        <title>
          {APP_NAME} - {caption}
        </title>
        <meta content={caption || ''} name={caption || ''} />
      </Helmet>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item>
              <Typography variant="h4">Страница не найдена</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item>
              <Button
                color="primary"
                size="large"
                variant="contained"
                onClick={handleGoToDashboard}>
                На главную
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Styled.Root>
  )
}
