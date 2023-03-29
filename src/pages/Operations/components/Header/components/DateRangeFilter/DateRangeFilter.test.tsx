import React from 'react'

import { DEFAULT_DATE_FORMAT, PATHS } from '@common/constants'

import { DateHelper } from '@helpers'

import { fireEvent, render, screen, waitFor } from '@testEnv/utils'

import { OperationsReportUrlSearchParams } from '../../../OperationsReport/constants/urlSearchParams'
import { DateRangeFilter } from './DateRangeFilter'

const currentMonthStart = DateHelper.toFormat(
  DateHelper.getStartOfMonth(new Date()),
)
const currentMonthEnd = DateHelper.toFormat(
  DateHelper.getEndOfMonth(new Date()),
)

let MOCK_URL_PARAMS: Record<string, string> = {}
let MOCK_PROPS: Record<string, unknown> = {}

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
  useLocationQuery: (props: Record<string, unknown>) => {
    MOCK_PROPS = props

    return {
      get: mockGetQuery,
      set: mockSetQuery,
    }
  },
}))

describe('<DateRangeFilter />', () => {
  const renderDateRangeFilter = () => render(<DateRangeFilter />)

  afterEach(() => {
    MOCK_URL_PARAMS = {}
    MOCK_PROPS = {}
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  test('render two filters on the page', async () => {
    renderDateRangeFilter()

    expect(screen.getByText('С')).toBeInTheDocument()
    expect(screen.getByText('По')).toBeInTheDocument()
    expect(screen.getAllByPlaceholderText(DEFAULT_DATE_FORMAT).length).toEqual(
      2,
    )
  })

  it('should store default filters value to url', async () => {
    renderDateRangeFilter()

    expect(MOCK_PROPS).toEqual({
      defaultParams: [
        {
          pathname: PATHS.operations,
          key: OperationsReportUrlSearchParams.startDate,
          value: currentMonthStart,
        },
        {
          pathname: PATHS.operations,
          key: OperationsReportUrlSearchParams.endDate,
          value: currentMonthEnd,
        },
      ],
    })
  })

  it('should fill filter fields with url params', async () => {
    MOCK_URL_PARAMS = {
      [OperationsReportUrlSearchParams.startDate]: currentMonthStart,
      [OperationsReportUrlSearchParams.endDate]: currentMonthEnd,
    }

    renderDateRangeFilter()

    expect(screen.getByDisplayValue(currentMonthStart)).toBeInTheDocument()
    expect(screen.getByDisplayValue(currentMonthEnd)).toBeInTheDocument()
  })

  describe('when change filters value', () => {
    it('should change "startDate" url value', async () => {
      MOCK_URL_PARAMS = {
        [OperationsReportUrlSearchParams.startDate]: currentMonthStart,
        [OperationsReportUrlSearchParams.endDate]: currentMonthEnd,
      }

      renderDateRangeFilter()

      const filter = screen.getByDisplayValue(currentMonthStart)

      expect(filter).toBeInTheDocument()

      const [day, month, year] = currentMonthStart.split('-')
      const prevYear = `${day}-${month}-${+year - 1}`

      fireEvent.change(filter, {
        target: { value: prevYear },
      })

      expect(
        MOCK_URL_PARAMS[OperationsReportUrlSearchParams.startDate],
      ).toEqual(prevYear)
    })

    it('should change "endDate" url value', async () => {
      MOCK_URL_PARAMS = {
        [OperationsReportUrlSearchParams.startDate]: currentMonthStart,
        [OperationsReportUrlSearchParams.endDate]: currentMonthEnd,
      }

      renderDateRangeFilter()

      const filter = screen.getByDisplayValue(currentMonthEnd)

      expect(filter).toBeInTheDocument()

      const [day, month, year] = currentMonthEnd.split('-')
      const nextYear = `${day}-${month}-${+year + 1}`

      fireEvent.change(filter, {
        target: { value: nextYear },
      })

      expect(MOCK_URL_PARAMS[OperationsReportUrlSearchParams.endDate]).toEqual(
        nextYear,
      )
    })

    describe('when open datepicker', () => {
      const fixedStartDate = '15-11-2022'
      const fixedEndDate = '16-11-2022'

      describe('when select range disabled', () => {
        it('should disable all dates before "startDate" for "endDate" datepicker', async () => {
          MOCK_URL_PARAMS = {
            [OperationsReportUrlSearchParams.startDate]: fixedStartDate,
            [OperationsReportUrlSearchParams.endDate]: fixedEndDate,
          }

          renderDateRangeFilter()

          const filter = screen.getAllByRole('button')[1]

          fireEvent.click(filter)

          await waitFor(async () => {
            expect(screen.getByText('15')).toBeInTheDocument()
          })

          expect(screen.getByText('14')).toBeDisabled()
        })

        it('should disable all dates after "endDate" for "startDate" datepicker', async () => {
          MOCK_URL_PARAMS = {
            [OperationsReportUrlSearchParams.startDate]: fixedStartDate,
            [OperationsReportUrlSearchParams.endDate]: fixedEndDate,
          }

          renderDateRangeFilter()

          const filter = screen.getAllByRole('button')[0]

          fireEvent.click(filter)

          await waitFor(async () => {
            expect(screen.getByText('16')).toBeInTheDocument()
          })

          expect(screen.getByText('17')).toBeDisabled()
        })
      })

      describe('when select range active', () => {
        it('should eneble all dates after or equal "startDate" for "endDate" datepicker', async () => {
          MOCK_URL_PARAMS = {
            [OperationsReportUrlSearchParams.startDate]: fixedStartDate,
            [OperationsReportUrlSearchParams.endDate]: fixedEndDate,
          }

          renderDateRangeFilter()

          const filter = screen.getAllByRole('button')[1]

          fireEvent.click(filter)

          await waitFor(async () => {
            expect(screen.getByText('15')).toBeInTheDocument()
          })

          expect(screen.getByText('15')).toBeEnabled()
        })

        it('should eneble all dates before or equal "endDate" for "startDate" datepicker', async () => {
          MOCK_URL_PARAMS = {
            [OperationsReportUrlSearchParams.startDate]: fixedStartDate,
            [OperationsReportUrlSearchParams.endDate]: fixedEndDate,
          }

          renderDateRangeFilter()

          const filter = screen.getAllByRole('button')[0]

          fireEvent.click(filter)

          await waitFor(async () => {
            expect(screen.getByText('16')).toBeInTheDocument()
          })

          expect(screen.getByText('16')).toBeEnabled()
        })
      })
    })
  })
})
