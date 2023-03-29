import React from 'react'

import { getEmptyFiltersArray } from '@pages/Operations/utils/getters'

import { fireEvent, render, screen } from '@testEnv/utils'

import { OperationsReportUrlSearchParams } from '../../../OperationsReport/constants/urlSearchParams'
import { FilterButton } from './FilterButton'
import { TEST_ID_CLEAR, TEST_ID_OPEN } from './constants/testIds'

let MOCK_URL_PARAMS: Record<string, string> = {}

const mockGetQuery = jest
  .fn()
  .mockImplementation(
    (key: keyof typeof MOCK_URL_PARAMS) => MOCK_URL_PARAMS[key],
  )
const mockSetQuery = jest
  .fn()
  .mockImplementation((param: { key: string; value: string }) => {
    MOCK_URL_PARAMS = { ...MOCK_URL_PARAMS, [param.key]: param.value }
  })

jest.mock('@hooks', () => ({
  useLocationQuery: () => ({
    get: mockGetQuery,
    set: mockSetQuery,
  }),
}))

describe('<FilterButton />', () => {
  const renderFilterButton = () => render(<FilterButton />)

  afterEach(() => {
    MOCK_URL_PARAMS = {}
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  test('render only filter button by default', () => {
    renderFilterButton()

    expect(screen.getByTestId(TEST_ID_OPEN)).toBeInTheDocument()
    expect(screen.queryByTestId(TEST_ID_CLEAR)).not.toBeInTheDocument()
  })

  describe('when show "counter" button', () => {
    it('should NOT display number of applied filters"', () => {
      MOCK_URL_PARAMS = {}

      renderFilterButton()

      expect(screen.queryByText('0')).not.toBeInTheDocument()
    })

    it('should display number of applied filters', () => {
      MOCK_URL_PARAMS = {
        [OperationsReportUrlSearchParams.articleId]: '40',
        [OperationsReportUrlSearchParams.maxAmount]: '100',
        [OperationsReportUrlSearchParams.minAmount]: '10',
      }

      renderFilterButton()

      expect(screen.getByText('3')).toBeInTheDocument()
    })
  })

  describe('when show "clear" button', () => {
    it('should show "clear" button if has applied filters', () => {
      MOCK_URL_PARAMS = {
        [OperationsReportUrlSearchParams.articleId]: '40',
        [OperationsReportUrlSearchParams.maxAmount]: '100',
        [OperationsReportUrlSearchParams.minAmount]: '10',
      }
      renderFilterButton()

      expect(screen.getByTestId(TEST_ID_CLEAR)).toBeInTheDocument()
    })

    it('should NOT show "clear" button if has NO applied filters', () => {
      MOCK_URL_PARAMS = {}
      renderFilterButton()

      expect(screen.queryByTestId(TEST_ID_CLEAR)).not.toBeInTheDocument()
    })
  })

  it('should open Drawer when click on "filter" button', () => {
    renderFilterButton()

    expect(screen.queryByText('Фильтры')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId(TEST_ID_OPEN))

    expect(screen.getByText('Фильтры')).toBeInTheDocument()
  })

  it('should clear all filters when press clear button', () => {
    MOCK_URL_PARAMS = {
      [OperationsReportUrlSearchParams.articleId]: '40',
      [OperationsReportUrlSearchParams.maxAmount]: '100',
      [OperationsReportUrlSearchParams.minAmount]: '10',
    }

    renderFilterButton()

    expect(screen.getByText('3')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId(TEST_ID_CLEAR))

    expect(mockSetQuery).toHaveBeenCalledWith(getEmptyFiltersArray())
  })
})
