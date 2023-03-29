import React from 'react'

import { BudgetItemDto } from '@rtkApi/modules/__generated__/financial'

import { articlesMock } from '@testEnv/mocks/constants/articles'

import { Props as FormArticleSelectProps } from '../components/forms/components/FormArticleSelect/FormArticleSelect.types'

export const MockFormArticleSelectProps: React.FC<FormArticleSelectProps> = ({
  value,
  onChange,
  error,
  label = 'Статья',
  placeholder = 'Например, Продукты',
  isPurchase,
  operationType,
  disabled,
}) => {
  const handleChange =
    (onChangeCallback: (newValue: BudgetItemDto) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeCallback(
        articlesMock[Number(event?.target.value)] as BudgetItemDto,
      )
    }

  return (
    <div>
      <span>{label}</span>
      <input
        data-is-purchase={isPurchase}
        data-operation-type={operationType}
        disabled={disabled}
        placeholder={placeholder}
        value={value?.id ?? ''}
        onChange={handleChange(onChange)}
      />
      {error && <div>{error}</div>}
    </div>
  )
}
