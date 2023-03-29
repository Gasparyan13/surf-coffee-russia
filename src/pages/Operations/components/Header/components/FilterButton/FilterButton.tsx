import React, { useCallback, useState } from 'react'

import { SvgCloseIcon } from '@common/IconComponents/SvgCloseIcon'
import { SvgFilterIcon } from '@common/IconComponents/SvgFilterIcon'

import { useLocationQuery } from '@hooks'

import {
  getEmptyFiltersArray,
  getNumberOfActiveFilters,
} from '@pages/Operations/utils/getters'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import { OperationsReportUrlSearchParams } from '../../../OperationsReport/constants/urlSearchParams'
import { FiltersDrawer } from '../FiltersDrawer'
import * as Styled from './FilterButton.styled'
import { TEST_ID_CLEAR, TEST_ID_OPEN } from './constants/testIds'

export const FilterButton: React.FC = () => {
  const [openFiltersDrawer, setOpenFiltersDrawer] = useState(false)

  const { get, set } = useLocationQuery()

  const numberOfActiveFilters = getNumberOfActiveFilters([
    get(OperationsReportUrlSearchParams.articleId),
    get(OperationsReportUrlSearchParams.contractorId),
    get(OperationsReportUrlSearchParams.maxAmount),
    get(OperationsReportUrlSearchParams.minAmount),
    get(OperationsReportUrlSearchParams.operationKind),
    get(OperationsReportUrlSearchParams.operationType),
  ])

  const handleToggleFiltersDrawer = useCallback(
    () => setOpenFiltersDrawer((prev) => !prev),
    [],
  )

  const handleResetFilters = useCallback(
    () => set(getEmptyFiltersArray()),
    [set],
  )

  const hasActiveFilters = !!numberOfActiveFilters

  return (
    <>
      <FiltersDrawer
        open={openFiltersDrawer}
        onClose={handleToggleFiltersDrawer}
      />
      <Styled.ButtonGroup disableElevation variant="contained">
        <Styled.Button
          {...createTestId(TEST_ID_OPEN)}
          onClick={handleToggleFiltersDrawer}>
          <SvgFilterIcon />
          {hasActiveFilters && (
            <Styled.FiltersCounter variant="PBody">
              {numberOfActiveFilters}
            </Styled.FiltersCounter>
          )}
        </Styled.Button>
        {hasActiveFilters && (
          <Styled.Button
            {...createTestId(TEST_ID_CLEAR)}
            onClick={handleResetFilters}>
            <SvgCloseIcon />
          </Styled.Button>
        )}
      </Styled.ButtonGroup>
    </>
  )
}
