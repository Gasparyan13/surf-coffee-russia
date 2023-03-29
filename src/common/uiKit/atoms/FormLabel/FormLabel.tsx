import { Grid } from '@mui/material'
import React from 'react'

import { mb } from '../../../common.styled'
import { LabelText } from '../LabelText'
import * as T from './FormLabel.types'

export const FormLabel: React.FC<T.Props> = ({ text, children, disabled }) => (
  <Grid container>
    <Grid item css={mb(8)} xs={12}>
      <LabelText disabled={disabled}>{text}</LabelText>
    </Grid>
    <Grid item xs={12}>
      {children}
    </Grid>
  </Grid>
)
