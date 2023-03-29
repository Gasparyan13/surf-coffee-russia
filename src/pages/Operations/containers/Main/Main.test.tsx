import React from 'react'

import { DateHelper } from '@helpers'

import { setupStore } from '@store/rootConfig'

import { appConfig } from '@testEnv/mocks/store/app'
import { setupServer } from '@testEnv/server'
import { mockGetFinancialOperationsGeneralView } from '@testEnv/server/handlers/financial'
import { fireEvent, render, screen, waitFor } from '@testEnv/utils'

import { OperationsReportUrlSearchParams } from '../../components/OperationsReport/constants/urlSearchParams'
import { Main } from './Main'

const currentMonthStart = DateHelper.toFormat(
  DateHelper.getStartOfMonth(new Date()),
)
const currentMonthEnd = DateHelper.toFormat(
  DateHelper.getEndOfMonth(new Date()),
)

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
  useLocationQuery: () => {
    return {
      get: mockGetQuery,
      set: mockSetQuery,
    }
  },
}))

const createServer = () => setupServer(mockGetFinancialOperationsGeneralView())

describe('<Main />', () => {
  const getMarks = (root: HTMLElement) => root.querySelectorAll('mark')
  const server = createServer()
  let appStore = setupStore({
    app: appConfig({}),
  })

  beforeEach(() => {
    appStore = setupStore({
      app: appConfig({}),
    })
    MOCK_URL_PARAMS = {
      [OperationsReportUrlSearchParams.startDate]: currentMonthStart,
      [OperationsReportUrlSearchParams.endDate]: currentMonthEnd,
    }
  })

  beforeAll(() => server.listen())
  afterAll(() => server.close())

  const renderMain = () => render(<Main />, { store: appStore })

  describe('when searching for contractorName or budgetItemName or productName', () => {
    it('should render empty result if there are not matches', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      const { rerender } = renderMain()

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      rerender(<Main />)

      const table = screen.getByRole('table')
      const tableRows = table.querySelectorAll('tbody > tr')
      const tableCells = table.querySelectorAll('tbody > tr > td')

      expect(tableRows.length).toEqual(1)
      expect(tableCells.length).toBe(7)

      const searchInput = screen.getByPlaceholderText(
        'Поиск по контрагенту, статье и наименованию',
      )

      fireEvent.change(searchInput, { target: { value: 'qwe' } })
      expect(searchInput).toHaveValue('qwe')

      await waitFor(() => {
        expect(MOCK_URL_PARAMS[OperationsReportUrlSearchParams.search]).toBe(
          'qwe',
        )
      })

      rerender(<Main />)

      const rerenderTable = screen.getByRole('table')
      const rerenderTableRows = rerenderTable.querySelectorAll('tbody > tr')
      const rerenderTableCells =
        rerenderTable.querySelectorAll('tbody > tr > td')

      expect(rerenderTableRows.length).toBe(1)
      expect(rerenderTableCells.length).toBe(1)
      expect(rerenderTableCells[0]).toHaveTextContent(/Ничего не найдено/)
    })

    it('should display table row that matches search query for contractorName', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      const { rerender } = renderMain()

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      rerender(<Main />)

      const table = screen.getByRole('table')
      const tableRows = table.querySelectorAll('tbody > tr')
      const tableCells = table.querySelectorAll('tbody > tr > td')

      expect(tableRows.length).toEqual(1)
      expect(tableCells.length).toBe(7)

      const searchInput = screen.getByPlaceholderText(
        'Поиск по контрагенту, статье и наименованию',
      )

      fireEvent.change(searchInput, { target: { value: 'пят' } })
      expect(searchInput).toHaveValue('пят')

      await waitFor(() => {
        expect(MOCK_URL_PARAMS[OperationsReportUrlSearchParams.search]).toBe(
          'пят',
        )
      })

      rerender(<Main />)

      const rerenderTable = screen.getByRole('table')
      const rerenderTableRows = rerenderTable.querySelectorAll('tbody > tr')
      const rerenderTableCells =
        rerenderTable.querySelectorAll('tbody > tr > td')

      expect(rerenderTableRows.length).toBe(1)
      expect(rerenderTableCells.length).toBe(7)
      expect(rerenderTableCells[3]).toHaveTextContent('ООО "Пятерочка"')

      const marks = getMarks(rerenderTable)
      expect(marks.length).toEqual(1)
    })

    it('should display table row that matches search query for budgetItemName', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      const { rerender } = renderMain()

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      rerender(<Main />)

      const table = screen.getByRole('table')
      const tableRows = table.querySelectorAll('tbody > tr')
      const tableCells = table.querySelectorAll('tbody > tr > td')

      expect(tableRows.length).toEqual(1)
      expect(tableCells.length).toBe(7)

      const searchInput = screen.getByPlaceholderText(
        'Поиск по контрагенту, статье и наименованию',
      )

      fireEvent.change(searchInput, { target: { value: 'рас' } })
      expect(searchInput).toHaveValue('рас')

      await waitFor(() => {
        expect(MOCK_URL_PARAMS[OperationsReportUrlSearchParams.search]).toBe(
          'рас',
        )
      })

      rerender(<Main />)

      const rerenderTable = screen.getByRole('table')
      const rerenderTableRows = rerenderTable.querySelectorAll('tbody > tr')
      const rerenderTableCells =
        rerenderTable.querySelectorAll('tbody > tr > td')

      expect(rerenderTableRows.length).toBe(1)
      expect(rerenderTableCells.length).toBe(7)
      expect(rerenderTableCells[4]).toHaveTextContent('Расход продуктов')

      const marks = getMarks(rerenderTable)
      expect(marks.length).toEqual(1)
    })

    it('should display table row that matches search query for budgetItemName', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      const { rerender } = renderMain()

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      rerender(<Main />)

      const table = screen.getByRole('table')
      const tableRows = table.querySelectorAll('tbody > tr')
      const tableCells = table.querySelectorAll('tbody > tr > td')

      expect(tableRows.length).toEqual(1)
      expect(tableCells.length).toBe(7)

      const searchInput = screen.getByPlaceholderText(
        'Поиск по контрагенту, статье и наименованию',
      )

      fireEvent.change(searchInput, { target: { value: 'ил' } })
      expect(searchInput).toHaveValue('ил')

      await waitFor(() => {
        expect(MOCK_URL_PARAMS[OperationsReportUrlSearchParams.search]).toBe(
          'ил',
        )
      })

      rerender(<Main />)

      const rerenderTable = screen.getByRole('table')
      const rerenderTableRows = rerenderTable.querySelectorAll('tbody > tr')
      const rerenderTableCells =
        rerenderTable.querySelectorAll('tbody > tr > td')

      expect(rerenderTableRows.length).toBe(1)
      expect(rerenderTableCells.length).toBe(7)
      expect(rerenderTableCells[5]).toHaveTextContent('Вилки пластиковые')

      const marks = getMarks(rerenderTable)
      expect(marks.length).toEqual(1)
    })
  })
})
