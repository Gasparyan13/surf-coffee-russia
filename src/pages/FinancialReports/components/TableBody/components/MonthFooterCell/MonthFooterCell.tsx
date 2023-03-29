import React from 'react'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import * as Styled from './MonthFooterCell.styled'
import * as T from './MonthFooterCell.types'
import { TEST_ID_MONTH_FOOTER_CELL } from './constants/testIds'

export const MonthFooterCell: React.FC<T.Props> = ({
  monthColumnIndex,
  currentMonthNumber,
}) => (
  <Styled.Root
    {...createTestId(`${TEST_ID_MONTH_FOOTER_CELL}-${monthColumnIndex}`)}
    $isCurrentMonth={currentMonthNumber === monthColumnIndex}
  />
)
