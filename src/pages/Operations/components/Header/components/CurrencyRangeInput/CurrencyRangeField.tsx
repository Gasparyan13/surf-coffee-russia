import { Grid } from '@mui/material'
import React, { useCallback } from 'react'

import { mb } from '@common/common.styled'

import { CurrencyField, HelperText, LabelText } from '@uiKit'

import * as Styled from './CurrencyRangeField.styled'
import * as T from './CurrencyRangeField.types'

export const CurrencyRangeField: React.FC<T.Props> = ({
  value,
  onChange,
  error,
  helperText,
  labelText,
  disabled,
}) => {
  const handleChangeValue = useCallback(
    (fieldName: 'min' | 'max') => (newValue?: string) => {
      onChange({
        ...value,
        [fieldName]: newValue,
      })
    },
    [onChange, value],
  )

  return (
    <Grid container>
      {labelText && (
        <Grid item css={mb(8)} xs={12}>
          <LabelText disabled={disabled}>{labelText}</LabelText>
        </Grid>
      )}
      <Grid item xs={12}>
        <Styled.Root>
          <CurrencyField
            disabled={disabled}
            error={error}
            placeholder="от"
            size="flex"
            value={value.min}
            onChange={handleChangeValue('min')}
          />
          <CurrencyField
            disabled={disabled}
            error={error}
            placeholder="до"
            size="flex"
            value={value.max}
            onChange={handleChangeValue('max')}
          />
        </Styled.Root>
      </Grid>
      {helperText && (
        <Grid item xs={12}>
          <HelperText disabled={disabled} error={error}>
            {helperText}
          </HelperText>
        </Grid>
      )}
    </Grid>
  )
}
