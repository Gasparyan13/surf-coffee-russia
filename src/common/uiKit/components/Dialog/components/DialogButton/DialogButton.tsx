import { Grid } from '@mui/material'
import React, { memo } from 'react'

import { width100CSS } from '../../../../../common.styled'
import { Button } from '../../../Button/Button'
import * as T from './DialogButton.types'

export const DialogButton: React.FC<T.Props> = memo(
  ({ disabled, onClick, color = 'primary', text }) => {
    return (
      <Grid item xs={12}>
        <Button
          color={color}
          css={width100CSS}
          disabled={disabled}
          variant="contained"
          onClick={onClick}>
          {text}
        </Button>
      </Grid>
    )
  },
)
