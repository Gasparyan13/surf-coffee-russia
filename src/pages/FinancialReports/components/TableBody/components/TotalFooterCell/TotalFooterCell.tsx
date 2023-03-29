import React from 'react'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import * as Styled from './TotalFooterCell.styled'
import { TEST_ID_TOTAL_FOOTER_CELL } from './constants/testIds'

export const TotalFooterCell: React.FC = () => (
  <Styled.Root {...createTestId(TEST_ID_TOTAL_FOOTER_CELL)} />
)
