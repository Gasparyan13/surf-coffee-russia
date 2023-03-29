import React from 'react'

import { NumberFormat } from '@common/newUi/NumberFormat'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import * as Styled from './CellText.styled'
import * as T from './CellText.types'

const TEXT_MAP = {
  BOLD: (props: T.TextVariantProps) => (
    <Styled.BoldText className="table-icon" {...props} />
  ),
  TITLE: (props: T.TextVariantProps) => (
    <Styled.TitleText className="table-icon" {...props} />
  ),
  REGULAR: (props: T.TextVariantProps) => (
    <Styled.RegularText className="table-icon" {...props} />
  ),
}

const getFormattedNumber = (amount: number) => Math.trunc(Number(amount))

export const CellText: React.FC<T.Props> = ({
  text,
  isNumber,
  numberFormat = 'integer',
  type,
  isEditable,
  disabled,
  tableColumnType,
  testId,
}) => {
  const TextComponent = TEXT_MAP[type]

  if (!isNumber)
    return (
      <TextComponent {...createTestId(testId)} disabled={disabled}>
        {text}
      </TextComponent>
    )

  const isInteger = numberFormat === 'integer'
  const formattedText = isInteger ? getFormattedNumber(Number(text)) : text

  return (
    <TextComponent
      {...createTestId(testId)}
      disabled={disabled || (!isEditable && tableColumnType !== 'SIDEBAR')}>
      <NumberFormat value={formattedText} />
    </TextComponent>
  )
}
