import { Grid } from '@mui/material'
import React from 'react'

import { SvgArrowIcon } from '@common/IconComponents/SvgArrowIcon'

import * as Styled from './GoBack.styled'
import * as T from './GoBack.types'

export const GoBack: React.FC<T.Props> = ({ onClick }) => {
  return (
    <Styled.Root>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        onClick={onClick}>
        <Grid item>
          <Styled.Icon>
            <SvgArrowIcon direction="right" height="19" width="11" />
          </Styled.Icon>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item>
              <Styled.Text>Назад</Styled.Text>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Styled.Root>
  )
}
