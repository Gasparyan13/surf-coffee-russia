import React from 'react'

import { getCommonMinDate, getYearMonth } from '@utils'

import { fireEvent, render, screen, waitFor } from '@testEnv/utils'

import { YearMonthUrlDatePicker } from './YearMonthUrlDatePicker'
import { PATH_MONTH, PATH_YEAR } from './YearMonthUrlDatePicker.constants'

let MOCK_URL_PARAMS: Record<string, string> = {}

const mockGetQuery = jest
  .fn()
  .mockImplementation(
    (key: keyof typeof MOCK_URL_PARAMS) => MOCK_URL_PARAMS[key],
  )
const mockSetQuery = jest
  .fn()
  .mockImplementation((params: { key: string; value: string }[]) => {
    MOCK_URL_PARAMS = {
      ...MOCK_URL_PARAMS,
      ...params.reduce(
        (acc, param) => ({
          ...acc,
          [param.key]: param.value,
        }),
        {},
      ),
    }
  })

jest.mock('@hooks', () => ({
  useLocationQuery: () => ({
    get: mockGetQuery,
    set: mockSetQuery,
  }),
}))

describe('<YearMonthUrlDatePicker />', () => {
  const renderYearMonthUrlDatePicker = () => render(<YearMonthUrlDatePicker />)

  afterEach(() => {
    MOCK_URL_PARAMS = {}
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  test('render DatePicker on the page', async () => {
    renderYearMonthUrlDatePicker()

    expect(screen.getByPlaceholderText('Выберите период')).toBeInTheDocument()
  })

  it('should store default filters value to URL if URL values are empty', async () => {
    expect(MOCK_URL_PARAMS[PATH_MONTH]).toBeUndefined()
    expect(MOCK_URL_PARAMS[PATH_YEAR]).toBeUndefined()

    renderYearMonthUrlDatePicker()

    const [year, month] = getYearMonth(new Date())

    await waitFor(async () => {
      expect(MOCK_URL_PARAMS).toEqual({
        [PATH_MONTH]: `${month}`,
        [PATH_YEAR]: `${year}`,
      })
    })
  })

  it('should fill DatePicker with URL params', async () => {
    MOCK_URL_PARAMS = {
      [PATH_MONTH]: '11',
      [PATH_YEAR]: '2021',
    }

    renderYearMonthUrlDatePicker()

    expect(screen.getByDisplayValue('Ноябрь, 2021')).toBeInTheDocument()
  })

  it('should change URL values', async () => {
    MOCK_URL_PARAMS = {
      [PATH_MONTH]: '11',
      [PATH_YEAR]: '2021',
    }

    renderYearMonthUrlDatePicker()

    const filter = screen.getByDisplayValue('Ноябрь, 2021')

    expect(filter).toBeInTheDocument()

    const newDate = 'Апрель, 2022'

    fireEvent.change(filter, {
      target: { value: newDate },
    })

    await waitFor(async () => {
      expect(MOCK_URL_PARAMS).toEqual({
        [PATH_MONTH]: '04',
        [PATH_YEAR]: '2022',
      })
    })
  })

  describe('when open "datepicker"', () => {
    it('should render active date between "min" and "max" dates in "datepicker"', async () => {
      MOCK_URL_PARAMS = {
        [PATH_MONTH]: '01',
        [PATH_YEAR]: '2022',
      }

      renderYearMonthUrlDatePicker()

      const minDate = getCommonMinDate().getFullYear()
      const maxDate = new Date().getFullYear()

      const filter = screen.getByRole('button')

      fireEvent.click(filter)

      await waitFor(async () => {
        expect(screen.getByText('Январь 2022')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Январь 2022'))

      await waitFor(async () => {
        expect(screen.getByText(`${minDate}`)).toBeInTheDocument()
      })

      for (let i = minDate; i <= maxDate; i += 1) {
        expect(screen.getByText(`${i}`)).toBeEnabled()
      }
    })

    it('should NOT render a date less than the minimum date in "datepicker"', async () => {
      MOCK_URL_PARAMS = {
        [PATH_MONTH]: '01',
        [PATH_YEAR]: '2022',
      }

      renderYearMonthUrlDatePicker()

      const minDate = getCommonMinDate().getFullYear()
      const prevMinDate = minDate - 1

      const filter = screen.getByRole('button')

      fireEvent.click(filter)

      await waitFor(async () => {
        expect(screen.getByText('Январь 2022')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Январь 2022'))

      await waitFor(async () => {
        expect(screen.getByText(`${minDate}`)).toBeEnabled()
      })

      expect(screen.queryByText(`${prevMinDate}`)).not.toBeInTheDocument()
    })

    it('should NOT render a date greater than today in "datepicker"', async () => {
      MOCK_URL_PARAMS = {
        [PATH_MONTH]: '01',
        [PATH_YEAR]: '2022',
      }

      renderYearMonthUrlDatePicker()

      const maxDate = new Date().getFullYear()
      const nextMaxDate = maxDate + 1

      const filter = screen.getByRole('button')

      fireEvent.click(filter)

      await waitFor(async () => {
        expect(screen.getByText('Январь 2022')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Январь 2022'))

      await waitFor(async () => {
        expect(screen.getByText(`${maxDate}`)).toBeEnabled()
      })

      expect(screen.queryByText(`${nextMaxDate}`)).not.toBeInTheDocument()
    })
  })
})
