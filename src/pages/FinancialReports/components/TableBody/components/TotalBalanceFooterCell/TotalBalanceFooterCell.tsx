import React from 'react'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import * as Styled from './TotalBalanceFooterCell.styled'
import * as T from './TotalBalanceFooterCell.types'
import { TEST_ID_TOTAL_BALANCE_FOOTER_CELL } from './constants/testIds'

export const TotalBalanceFooterCell: React.FC<T.Props> = ({ columnKey }) => (
  <Styled.Empty
    {...createTestId(`${TEST_ID_TOTAL_BALANCE_FOOTER_CELL}-${columnKey}`)}
  />
)
