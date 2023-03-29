import React from 'react'

import { PATHS } from '@constants'

import { fireEvent, render, screen, waitFor } from '@testEnv/utils'

import { OperationsReportUrlSearchParams } from '../../../OperationsReport/constants/urlSearchParams'
import { SearchFilter } from './SearchFilter'

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

describe('<SearchFilter />', () => {
  const renderSearchFilter = () => render(<SearchFilter />)

  afterEach(() => {
    MOCK_URL_PARAMS = {}
    MOCK_PROPS = {}
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should render search input', async () => {
    renderSearchFilter()

    const searchInput = screen.getByPlaceholderText(
      'Поиск по контрагенту, статье и наименованию',
    )

    expect(searchInput).toBeInTheDocument()
  })

  it('should store default filters value to url', async () => {
    renderSearchFilter()

    expect(MOCK_PROPS).toEqual({
      defaultParams: [
        {
          pathname: PATHS.operations,
          key: OperationsReportUrlSearchParams.search,
          value: '',
        },
      ],
    })
  })

  it('should fill search filter with url params', async () => {
    MOCK_URL_PARAMS = {
      [OperationsReportUrlSearchParams.search]: 'qwe',
    }

    renderSearchFilter()

    const searchField = screen.getByPlaceholderText(
      'Поиск по контрагенту, статье и наименованию',
    )

    expect(searchField).toHaveValue('qwe')
  })

  it('should change "search" url value', async () => {
    renderSearchFilter()

    const searchField = screen.getByPlaceholderText(
      'Поиск по контрагенту, статье и наименованию',
    )

    expect(searchField).toBeInTheDocument()

    fireEvent.change(searchField, { target: { value: '123' } })

    await waitFor(() => {
      expect(MOCK_URL_PARAMS[OperationsReportUrlSearchParams.search]).toEqual(
        '123',
      )
    })
  })
})
