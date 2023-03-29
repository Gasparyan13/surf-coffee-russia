import { Grid } from '@mui/material'
import React from 'react'

import { mb } from '@common/common.styled'
import { HelperText, LabelText } from '@common/uiKit'

import * as Styled from './TextField.styled'
import * as T from './TextField.types'

export const TextField: React.FC<T.Props> = ({
  disabled,
  labelText,
  helperText,
  size = 'flex',
  error,
  ...restInputProps
}) => (
  <Styled.Root>
    <Grid container>
      {labelText && (
        <Grid item css={mb(8)} xs={12}>
          <LabelText disabled={disabled}>{labelText}</LabelText>
        </Grid>
      )}
      <Grid item xs={12}>
        <Styled.TextField
          fullWidth
          $disabled={disabled}
          $error={error}
          $selectSize={size}
          disabled={disabled}
          error={error}
          {...restInputProps}
        />
      </Grid>
      {helperText && (
        <Grid item xs={12}>
          <HelperText disabled={disabled} error={error}>
            {helperText}
          </HelperText>
        </Grid>
      )}
    </Grid>
  </Styled.Root>
)
