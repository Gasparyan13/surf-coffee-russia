import { Grid } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import {
  FieldError,
  FieldValues,
  Path,
  PathValue,
  useController,
} from 'react-hook-form'

import { NumberFormat } from '@common/newUi/NumberFormat'
import { Nullable } from '@common/types/Nullable'

import { ExcludedBudgetItems } from '@components/BudgetItemsAutocomplete/BudgetItemsAutocomplete.types'

import { uuid } from '@helpers'

import { Typography } from '@uiKit'
import { AutocompleteItem } from '@uiKit/components/Autocomplete/Autocomplete.types'
import { ExtendableList } from '@uiKit/components/ExpandableList/ExtendableList'

import { idExcludedBudgetItems } from '@pages/CreateOperations/constants/constants'
import { getIsIdPayrollBudgetItem } from '@pages/CreateOperations/utils/getters'

import { BudgetItemDto } from '@rtkApi/modules/__generated__/financial'

import { FormExpenseItem } from '../FormExpenseItem'
import { ExpenseItemValue } from '../FormExpenseItem/FormExpenseItem.types'
import { totalContentCSS } from './FormExpenses.styled'
import * as T from './FormExpenses.types'
import { ExpensesItemFieldKey } from './constants/enums'
import { useGetUsedCapitalAssets } from './hooks/useGetUsedCapitalAssets'
import { getTotalSum, getTypeValue } from './utils/getters'

export const FormExpenses: <C extends FieldValues>(
  props: T.Props<C>,
) => React.ReactElement<T.Props<C>> = ({
  name,
  control,
  itemsNames,
  hasAdditionalFieldsCapitalAssets,
  isPurchase,
  hasPrimeCostInput,
  trigger,
  clearErrors,
  operationType,
  hasExcludedBudgetItems,
}) => {
  const [totalSum, setTotalSum] = useState(0)
  const [excludedBudgetItems, setExcludedBudgetItems] =
    useState<Nullable<ExcludedBudgetItems>>(null)
  const [selectedUsedCapitalAssests, setSelectedUsedCapitalAssests] =
    useState<T.SelectedUsedCapitalAssests>([])
  const [canAddExtendableItem, setCanAddExtendableItem] = useState(true)

  const usedCapitalAssets = useGetUsedCapitalAssets(
    hasAdditionalFieldsCapitalAssets,
  )

  const createItem = useCallback(
    () => ({
      id: uuid(),
      budgetItem: null,
    }),
    [],
  )

  const setAddExtendableItem = () => setCanAddExtendableItem(true)

  const resetExcludedBudgetItems = () => setExcludedBudgetItems(null)

  const {
    field: { onChange, value: items },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: [createItem()] as PathValue<unknown, Path<unknown>>,
  })

  const setStateSelectedUsedCapitalAssests = (cards: T.ExpensesValue[]) => {
    const selectedUsedCapitalAssestsArray: T.SelectedUsedCapitalAssests = []

    cards.forEach((card: T.ExpensesValue, cardIndex: number) => {
      selectedUsedCapitalAssestsArray[cardIndex] =
        card[ExpensesItemFieldKey.NAME] || null
    })

    setSelectedUsedCapitalAssests(selectedUsedCapitalAssestsArray)
  }

  const handleChangeBudgetItem = (
    budgetItemId: number,
    currentItems: T.ExpensesValue[],
  ): T.ExpensesValue[] => {
    if (!isPurchase || !hasExcludedBudgetItems) {
      setAddExtendableItem()
      return currentItems
    }

    let filterItems = [...currentItems]

    if (getIsIdPayrollBudgetItem(budgetItemId)) {
      /* 
        Если выбрали статью ФОТ(Вознаграждение команды),
        то оставляем только одну карточку и запрещаем добавлять новые
      */
      filterItems = currentItems.filter(
        (currentItem: T.ExpensesValue) =>
          currentItem.budgetItem?.id === budgetItemId,
      )
      setCanAddExtendableItem(false)
    } else {
      setAddExtendableItem()

      if (!excludedBudgetItems) setExcludedBudgetItems(idExcludedBudgetItems)
    }

    return filterItems
  }

  const handleChangeItem =
    (fieldName: string, fieldIndex: number) =>
    (value: ExpenseItemValue, autoCompleteValue?: AutocompleteItem) => {
      let newItems = items.map(
        (currentItem: T.ExpensesValue, currentItemIndex: number) => {
          if (currentItemIndex !== fieldIndex) return currentItem

          return {
            ...currentItem,
            [fieldName]: autoCompleteValue?.value || getTypeValue(value),
          }
        },
      )

      // Если выбрали или удалили из автокомплита ОС
      if (autoCompleteValue || autoCompleteValue === null) {
        setStateSelectedUsedCapitalAssests(newItems)
      }

      // Если выбираем статью
      if (fieldName === ExpensesItemFieldKey.BUDGET_ITEM) {
        if (value) {
          newItems = handleChangeBudgetItem(
            (value as BudgetItemDto).id!,
            newItems,
          )
        } else {
          setAddExtendableItem()
          resetExcludedBudgetItems()
        }
      }

      onChange(newItems)
      setTotalSum(getTotalSum(newItems))
    }

  const getError = useCallback(
    (
      index: number,
      key: string,
      itemError?: FieldError,
    ): FieldError | undefined => {
      const errors = itemError as { [k: string]: FieldError }[] | undefined

      return errors?.[index]?.[key]
    },
    [],
  )

  useEffect(() => {
    setTotalSum(getTotalSum(items))

    if (usedCapitalAssets?.length) {
      setStateSelectedUsedCapitalAssests(items)
    }
  }, [items.length])

  useEffect(() => {
    resetExcludedBudgetItems()
    if (isPurchase) setSelectedUsedCapitalAssests([])
  }, [isPurchase])

  useEffect(() => {
    const expenses = items[0] as T.ExpensesValue
    const budgetItem = expenses.budgetItem as BudgetItemDto

    if (budgetItem && budgetItem.id) {
      handleChangeBudgetItem(budgetItem.id, items)
    }
  }, [])

  return (
    <Grid container flexDirection="column">
      <Grid item xs={12}>
        <ExtendableList
          canAdd={canAddExtendableItem}
          createItem={createItem}
          items={items}
          renderContent={(_, index) => (
            <FormExpenseItem
              clearErrors={clearErrors}
              error={error}
              excludedBudgetItems={excludedBudgetItems}
              getError={getError}
              handleChangeItem={handleChangeItem}
              hasAdditionalFieldsCapitalAssets={
                hasAdditionalFieldsCapitalAssets
              }
              hasPrimeCostInput={hasPrimeCostInput}
              index={index}
              isPurchase={isPurchase}
              items={items}
              itemsNames={itemsNames}
              operationType={operationType}
              options={usedCapitalAssets}
              selectedOptions={selectedUsedCapitalAssests}
              trigger={trigger}
            />
          )}
          onChange={onChange}
        />
      </Grid>
      {items?.length > 1 && (
        <Grid item css={totalContentCSS}>
          <Typography variant="PBody">Итоговая сумма:</Typography>
          <Typography variant="PBody">
            <NumberFormat value={totalSum} />₽
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}
