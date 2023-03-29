import React from 'react'

import { BudgetItemsAutocomplete } from '@components'

import * as T from './FormArticleSelect.types'

export const FormArticleSelect: React.FC<T.Props> = ({
  value,
  onChange,
  error,
  label = 'Статья',
  placeholder = 'Например, Продукты',
  isPurchase,
  operationType,
  disabled,
  excludedBudgetItems,
}) => (
  <BudgetItemsAutocomplete
    disabled={disabled}
    error={error}
    excludedBudgetItems={excludedBudgetItems}
    isPurchase={isPurchase}
    label={label}
    operationType={operationType}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
)
