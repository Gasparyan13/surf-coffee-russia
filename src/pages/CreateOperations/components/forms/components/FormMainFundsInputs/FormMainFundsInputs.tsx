import { Grid, GridSize } from '@mui/material'
import React from 'react'

import { pt } from '@common/common.styled'

import { MONTH_YEAR_FORMAT } from '@constants'

import { DateHelper } from '@helpers'

import { DatePicker } from '@uiKit'

import { ExpensesItemFieldKey } from '../FormExpenses'
import { FormPeriodOfUseInput } from '../FormPeriodOfUseInput'
import * as T from './FormMainFundsInputs.types'

export const FormMainFundsInputs: React.FC<T.Props> = ({
  index,
  getLabelPlaceholder,
  onChange,
  error,
  getError,
  dateValue,
  periodOfUseValue,
  disabled,
}) => {
  return (
    <Grid container justifyContent="space-between">
      <Grid item css={pt(16)} xs={6}>
        <DatePicker
          inputReadOnly
          disabled={disabled}
          error={
            !!getError(index, ExpensesItemFieldKey.COMMISSIONING_DATE, error)
          }
          helperText={
            getError(index, ExpensesItemFieldKey.COMMISSIONING_DATE, error)
              ?.message
          }
          inputFormat={MONTH_YEAR_FORMAT}
          labelText="Ввод в эксплуатацию"
          minDate={new Date()}
          openTo="month"
          placeholder={DateHelper.toLocaleFormat(new Date(), MONTH_YEAR_FORMAT)}
          value={dateValue ?? null}
          views={['year', 'month']}
          onChange={onChange(ExpensesItemFieldKey.COMMISSIONING_DATE, index)}
        />
      </Grid>
      <Grid item css={pt(16)} xs={5.21 as GridSize}>
        <FormPeriodOfUseInput
          {...getLabelPlaceholder(ExpensesItemFieldKey.PERIOD_OF_USE)}
          disabled={disabled}
          error={
            getError(index, ExpensesItemFieldKey.PERIOD_OF_USE, error)?.message
          }
          value={periodOfUseValue ?? ''}
          onChange={onChange(ExpensesItemFieldKey.PERIOD_OF_USE, index)}
        />
      </Grid>
    </Grid>
  )
}
