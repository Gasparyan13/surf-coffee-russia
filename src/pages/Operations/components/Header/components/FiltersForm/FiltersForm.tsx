import { yupResolver } from '@hookform/resolvers/yup'
import { Grid } from '@mui/material'
import React, { forwardRef, useImperativeHandle } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { pr } from '@common/common.styled'
import { BudgetItemsAutocomplete } from '@common/components'
import { ContractorAutocomplete } from '@common/components/ContractorAutocomplete'
import { FormRowLayout } from '@common/components/FormRowLayout'

import { SelectSingle } from '@uiKit'

import { CurrencyRangeField } from '../CurrencyRangeInput'
import { FiltersFormRefType } from '../FiltersDrawer/FiltersDrawer.types'
import * as Styled from './FiltersForm.styled'
import * as T from './FiltersForm.types'
import { defaultValues } from './constants/defaultValues'
import { operationDirections, operationTypes } from './constants/options'
import { schema } from './constants/schema'

export const FiltersForm = forwardRef<FiltersFormRefType, T.Props>(
  ({ onComplete, initialValues = {} }, ref) => {
    const {
      control,
      handleSubmit: onSubmit,
      formState: { errors, isDirty },
    } = useForm<T.Filters>({
      defaultValues: {
        ...defaultValues,
        ...initialValues,
        amount: {
          ...defaultValues.amount,
          ...initialValues.amount,
        },
      },
      resolver: yupResolver(schema),
    })

    useImperativeHandle(
      ref,
      () => ({
        onSubmit: onSubmit(onComplete),
        isDirty,
      }),
      [onSubmit, onComplete, isDirty],
    )

    return (
      <Styled.Root>
        <Grid container css={pr(5)} spacing={4}>
          <Grid item xs={12}>
            <FormRowLayout>
              <Controller
                control={control}
                name="operationType"
                render={({ field: { value, onChange } }) => (
                  <div>
                    <SelectSingle
                      error={!!errors.operationType}
                      helperText={errors.operationType?.message}
                      labelText="Тип операции"
                      menus={operationTypes}
                      placeholder="Выберите тип"
                      value={value ?? ''}
                      onChange={onChange}
                    />
                  </div>
                )}
              />
              <Controller
                control={control}
                name="operationKind"
                render={({ field: { value, onChange } }) => (
                  <div>
                    <SelectSingle
                      error={!!errors.operationKind}
                      helperText={errors.operationKind?.message}
                      labelText="Вид операции"
                      menus={operationDirections}
                      placeholder="Выберите вид"
                      value={value ?? ''}
                      onChange={onChange}
                    />
                  </div>
                )}
              />
            </FormRowLayout>
          </Grid>
          <Grid item xs={12}>
            <FormRowLayout>
              <Controller
                control={control}
                name="contractor"
                render={({ field: { value, onChange } }) => (
                  <ContractorAutocomplete
                    error={!!errors.contractor}
                    helperText={errors.contractor?.message}
                    labelText="Контрагент"
                    placeholder="Выберите контрагента"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="article"
                render={({ field: { value, onChange } }) => (
                  <BudgetItemsAutocomplete
                    error={errors.article?.message}
                    label="Статья"
                    placeholder="Выберите статью"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </FormRowLayout>
          </Grid>
          <Grid item xs={12}>
            <FormRowLayout>
              <Controller
                control={control}
                name="amount"
                render={({ field: { value, onChange } }) => (
                  <CurrencyRangeField
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                    labelText="Сумма"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </FormRowLayout>
          </Grid>
        </Grid>
      </Styled.Root>
    )
  },
)
