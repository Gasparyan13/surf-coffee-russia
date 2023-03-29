import { Grid, GridSize } from '@mui/material'
import React, { useCallback } from 'react'
import { FieldValues, Path } from 'react-hook-form'

import { pt } from '@common/common.styled'

import { FormArticleSelect } from '../FormArticleSelect'
import { FormDenominationAutocomplete } from '../FormDenominationAutocomplete'
import { FormDenominationInput } from '../FormDenominationInput'
import { ExpensesItemFieldKey } from '../FormExpenses'
import { FormMainFundsInputs } from '../FormMainFundsInputs'
import { FormPrimeCostInput } from '../FormPrimeCostInput'
import { FormSumInput } from '../FormSumInput'
import { ExpenseProps } from './FormExpenseItem.types'
import { getOptions } from './utils/getters'

export const FormExpenseItem: <T extends FieldValues, K extends Path<T>>(
  props: ExpenseProps<T, K>,
) => React.ReactElement<ExpenseProps<T, K>> = ({
  items,
  hasAdditionalFieldsCapitalAssets,
  error,
  index,
  handleChangeItem,
  getError,
  isPurchase,
  itemsNames,
  options,
  trigger,
  clearErrors,
  selectedOptions,
  operationType,
  hasPrimeCostInput,
  excludedBudgetItems,
}) => {
  const { disabled } = items[index]
  const denominationValue = items[index][ExpensesItemFieldKey.NAME]
  const articleValue = items[index][ExpensesItemFieldKey.BUDGET_ITEM]

  const isCapitalAssets = Boolean(
    hasAdditionalFieldsCapitalAssets && articleValue?.isCapitalAssets,
  )

  const hasPrimeCost = Boolean(
    hasPrimeCostInput && !articleValue?.isCapitalAssets,
  )
  const isPurchaseCapitalAssets = isCapitalAssets && isPurchase

  const getLabelPlaceholder = useCallback(
    (field: ExpensesItemFieldKey, isCapitalAssetsField?: boolean) => ({
      label:
        isCapitalAssetsField && isPurchase
          ? 'Уникальное наименование товара'
          : itemsNames?.[field]?.label,
      placeholder: isCapitalAssetsField
        ? 'Например, кофемашина'
        : itemsNames?.[field]?.placeholder,
    }),
    [isPurchase, itemsNames],
  )

  const handleNameBlur = useCallback(async () => {
    if (trigger && denominationValue)
      trigger(`expenses[${index}].name` as Path<unknown>)
  }, [trigger, denominationValue, index])

  const handleNameFocus = useCallback(async () => {
    if (clearErrors) clearErrors(`expenses[${index}].name` as Path<unknown>)
  }, [clearErrors, index])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between">
          <Grid item xs={6}>
            <FormArticleSelect
              {...getLabelPlaceholder(ExpensesItemFieldKey.BUDGET_ITEM)}
              disabled={disabled}
              error={
                getError(index, ExpensesItemFieldKey.BUDGET_ITEM, error)
                  ?.message
              }
              excludedBudgetItems={index !== 0 ? excludedBudgetItems : null}
              isPurchase={isPurchase}
              operationType={operationType}
              value={items[index][ExpensesItemFieldKey.BUDGET_ITEM]}
              // Для первой карточки не исключаем ФОТ
              onChange={handleChangeItem(
                ExpensesItemFieldKey.BUDGET_ITEM,
                index,
              )}
            />
          </Grid>
          <Grid item xs={5.21 as GridSize}>
            <FormSumInput
              {...getLabelPlaceholder(ExpensesItemFieldKey.AMOUNT)}
              disabled={disabled}
              error={
                getError(index, ExpensesItemFieldKey.AMOUNT, error)?.message
              }
              value={items[index][ExpensesItemFieldKey.AMOUNT]}
              onChange={handleChangeItem(ExpensesItemFieldKey.AMOUNT, index)}
            />
          </Grid>
        </Grid>
        <Grid item css={pt(16)} xs={12}>
          <Grid container justifyContent="space-between">
            <Grid item xs={hasPrimeCost ? 6 : 12}>
              {isCapitalAssets && !isPurchase ? (
                <FormDenominationAutocomplete
                  {...getLabelPlaceholder(
                    ExpensesItemFieldKey.NAME,
                    isCapitalAssets,
                  )}
                  disabled={disabled}
                  error={
                    getError(index, ExpensesItemFieldKey.NAME, error)?.message
                  }
                  options={getOptions(
                    options,
                    selectedOptions,
                    denominationValue,
                    disabled,
                  )}
                  value={items[index][ExpensesItemFieldKey.NAME]}
                  onChange={handleChangeItem(ExpensesItemFieldKey.NAME, index)}
                />
              ) : (
                <FormDenominationInput
                  {...getLabelPlaceholder(
                    ExpensesItemFieldKey.NAME,
                    isCapitalAssets,
                  )}
                  disabled={disabled}
                  error={
                    getError(index, ExpensesItemFieldKey.NAME, error)?.message
                  }
                  inputProps={{
                    onBlur: handleNameBlur,
                    onFocus: handleNameFocus,
                  }}
                  value={items[index][ExpensesItemFieldKey.NAME]}
                  onChange={handleChangeItem(ExpensesItemFieldKey.NAME, index)}
                />
              )}
            </Grid>
            {hasPrimeCost && (
              <Grid item xs={5.21 as GridSize}>
                <FormPrimeCostInput
                  {...getLabelPlaceholder(ExpensesItemFieldKey.PRIME_COST)}
                  disabled={disabled}
                  error={
                    getError(index, ExpensesItemFieldKey.PRIME_COST, error)
                      ?.message
                  }
                  value={items[index][ExpensesItemFieldKey.PRIME_COST]}
                  onChange={handleChangeItem(
                    ExpensesItemFieldKey.PRIME_COST,
                    index,
                  )}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        {isPurchaseCapitalAssets && (
          <FormMainFundsInputs
            dateValue={items[index][ExpensesItemFieldKey.COMMISSIONING_DATE]}
            disabled={disabled}
            error={error}
            getError={getError}
            getLabelPlaceholder={getLabelPlaceholder}
            index={index}
            periodOfUseValue={items[index][ExpensesItemFieldKey.PERIOD_OF_USE]}
            onChange={handleChangeItem}
          />
        )}
      </Grid>
    </Grid>
  )
}
