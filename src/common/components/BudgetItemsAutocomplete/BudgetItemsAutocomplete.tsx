import MuiAutocomplete, {
  AutocompleteInputChangeReason,
} from '@mui/material/Autocomplete'
import React, { useCallback, useEffect, useState } from 'react'

import { SvgArrowIcon } from '@common/IconComponents/SvgArrowIcon'
import { SvgCrossIcon } from '@common/IconComponents/SvgCrossIcon'
import { mt } from '@common/common.styled'
import { Nullable } from '@common/types/Nullable'

import { theme } from '@providers/ThemeProvider/theme'

import { TextField, Typography } from '@uiKit'
import { autocompleteBaseCSS } from '@uiKit/components/Autocomplete/Autocomplete.styled'
import { EMPTY_RESULTS_PLACEHOLDER } from '@uiKit/components/Autocomplete/constants/placeholder'

import { BudgetItemViewDto } from '@rtkApi/modules/__generated__/prepayment'

import { GroupHeader, GroupItems } from './BudgetItemsAutocomplete.styled'
import * as T from './BudgetItemsAutocomplete.types'
import { BudgetItem } from './components/BudgetItem'
import { AutocompleteStyles } from './constants/styles'
import { useFetchBudgetItems } from './hooks/useFetchBudgetItems'
import {
  filterOptions,
  getBudgetItemsMap,
  getBudgetItemsWithoutRoots,
  getFilteredBudgetItems,
  getFirstLevelBudgetItems,
  getIsStartMatches,
} from './utils/getters'

export const BudgetItemsAutocomplete: React.FC<T.Props> = ({
  value,
  onChange,
  placeholder,
  isPurchase,
  operationType,
  disabled,
  label,
  error,
  excludedBudgetItems,
}) => {
  const [budgetItemsMap, setBudgetItemsMap] =
    useState<Nullable<T.BudgetItemsMap>>(null)
  const [filterBudgetItems, setFilterBudgetItems] = useState<
    BudgetItemViewDto[]
  >([])
  const [visibleBudgetItemsId, setVisibleBudgetItemsId] = useState<number[]>([])
  const [autocompleteValue, setAutocompleteValue] =
    useState<Nullable<BudgetItemViewDto>>(value)
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const [isSelectedBudgetItem, setIsSelectedBudgetItem] = useState(false)
  const hasBudgetItemsMap = !!budgetItemsMap

  const [budgetItems, isLoadingBudgetItems] = useFetchBudgetItems({
    isPurchase,
    operationType,
  })

  const closeAutocomplete = useCallback(() => {
    setOpen(false)
    if (autocompleteValue) setIsSelectedBudgetItem(true)
  }, [autocompleteValue])

  const openAutocomplete = () => setOpen(true)

  const groupByRootBudgetItem = (option: BudgetItemViewDto): string => {
    return option.rootId && budgetItemsMap
      ? budgetItemsMap[option.rootId].name!
      : ''
  }

  const changeAutocompleteValue = useCallback(
    (budgetItem: Nullable<BudgetItemViewDto>) => {
      setIsSelectedBudgetItem(true)
      setAutocompleteValue(budgetItem)
      onChange(budgetItem)
    },
    [onChange],
  )

  const handleBudgetItemClick = useCallback(
    (budgetItem: BudgetItemViewDto) => {
      if (budgetItem.children?.length === 0) {
        changeAutocompleteValue(budgetItem)
        closeAutocomplete()
      }
    },
    [changeAutocompleteValue, closeAutocomplete],
  )

  const handleAutocompleteChange = useCallback(
    (
      event: React.SyntheticEvent<Element, Event>,
      newValue: Nullable<BudgetItemViewDto>,
    ) => {
      changeAutocompleteValue(newValue)
    },
    [changeAutocompleteValue],
  )

  const handleInputChange = useCallback(
    (
      event: React.SyntheticEvent,
      newInputValue: string,
      reason: AutocompleteInputChangeReason,
    ) => {
      if (reason === 'clear' || reason === 'input')
        setIsSelectedBudgetItem(false)
      setInputValue(newInputValue)
    },
    [],
  )

  useEffect(() => {
    if (!budgetItems) return

    setBudgetItemsMap(getBudgetItemsMap(budgetItems))

    const filterBudgetItemsValue = getBudgetItemsWithoutRoots([...budgetItems])

    setFilterBudgetItems(filterBudgetItemsValue)
    setVisibleBudgetItemsId(getFirstLevelBudgetItems(filterBudgetItemsValue))
  }, [budgetItems])

  useEffect(() => {
    if (typeof excludedBudgetItems === 'undefined' || !hasBudgetItemsMap) return

    const excludedBudgetItemsMap = getFilteredBudgetItems(
      excludedBudgetItems,
      budgetItemsMap,
    )

    if (excludedBudgetItemsMap) setBudgetItemsMap(excludedBudgetItemsMap)
  }, [excludedBudgetItems, hasBudgetItemsMap])

  useEffect(() => {
    setAutocompleteValue(value)
  }, [value])

  return (
    <MuiAutocomplete
      ListboxProps={{ style: AutocompleteStyles }}
      clearIcon={<SvgCrossIcon />}
      css={autocompleteBaseCSS}
      disabled={disabled}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.name!}
      groupBy={(option) => groupByRootBudgetItem(option)}
      inputValue={inputValue}
      isOptionEqualToValue={(option, currentValue) =>
        option.id === currentValue.id
      }
      loading={isLoadingBudgetItems}
      loadingText="Загрузка..."
      noOptionsText={
        <Typography color={theme.colors.pencil} css={mt(1)} variant="PBody">
          {EMPTY_RESULTS_PLACEHOLDER}
        </Typography>
      }
      open={open}
      options={filterBudgetItems}
      popupIcon={<SvgArrowIcon />}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>
            <Typography color={theme.colors.wetAsphalt} variant="Small">
              {params.group}
            </Typography>
          </GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!error}
          helperText={error}
          inputProps={{
            ...params.inputProps,
            onKeyDown: (e) => {
              if (e.key === 'Enter') {
                e.stopPropagation()
              }
            },
          }}
          labelText={label}
          placeholder={placeholder}
          size="flex"
        />
      )}
      renderOption={(props, option) => {
        if (!budgetItemsMap) return

        const isVisible = visibleBudgetItemsId.includes(option.id!)

        if (!isVisible) return

        const isStartMatches = getIsStartMatches(inputValue)
        const budgetItem = budgetItemsMap[option.id!]

        return (
          <BudgetItem
            {...props}
            key={budgetItem.id}
            budgetItemsMap={budgetItemsMap}
            id={budgetItem.id!}
            isSelectedBudgetItem={isSelectedBudgetItem}
            isStartMatches={isStartMatches}
            level={budgetItem.level!}
            name={budgetItem.name!}
            optionIds={budgetItem.children!}
            searchValue={inputValue}
            selectedId={value ? value.id! : null}
            onClick={handleBudgetItemClick}
          />
        )
      }}
      value={autocompleteValue}
      onChange={handleAutocompleteChange}
      onClose={closeAutocomplete}
      onInputChange={handleInputChange}
      onOpen={openAutocomplete}
    />
  )
}
