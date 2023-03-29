import React from 'react'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import * as Styled from './SidebarFooterCell.styled'
import * as T from './SidebarFooterCell.types'
import { PLACEHOLDER_NO_SEARCH_RESULTS } from './constants/placeholders'
import { TEST_ID_SIDEBAR_FOOTER_CELL } from './constants/testIds'

export const SidebarFooterCell: React.FC<T.Props> = ({
  hasBorder,
  showPlaceholder,
  placeholder = PLACEHOLDER_NO_SEARCH_RESULTS,
}) => (
  <Styled.Root
    {...createTestId(TEST_ID_SIDEBAR_FOOTER_CELL)}
    $hasBorder={hasBorder}>
    {showPlaceholder && (
      <Styled.Placeholder variant="PBody">{placeholder}</Styled.Placeholder>
    )}
  </Styled.Root>
)
