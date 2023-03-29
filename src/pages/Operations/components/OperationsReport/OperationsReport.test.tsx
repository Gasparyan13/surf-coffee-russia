import React from 'react'

import { ERROR_MESSAGE_500 } from '@constants'

import { setupStore } from '@store/rootConfig'

import { appConfig } from '@testEnv/mocks/store/app'
import { setupServer } from '@testEnv/server'
import { mockGetFinancialOperationsGeneralView } from '@testEnv/server/handlers/financial'
import {
  render,
  screen,
  waitFor,
  waitForProgressBarComplete,
} from '@testEnv/utils'

import { Props as OperationsTableProps } from '../OperationsTable/OperationsTable.types'
import { OperationsReport } from './OperationsReport'
import { OperationsReportUrlSearchParams } from './constants/urlSearchParams'

const MOCK_DATE = '30-11-2022'
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

jest.mock('../OperationsTable', () => ({
  OperationsTable: ({ rows }: OperationsTableProps) => (
    <div data-rows={rows}>OperationsTable</div>
  ),
}))

const createServer = () => setupServer(mockGetFinancialOperationsGeneralView())

describe('<OperationsReport />', () => {
  const server = createServer()

  let appStore = setupStore({
    app: appConfig({}),
  })

  const renderOperationsReport = () =>
    render(<OperationsReport />, { store: appStore })

  beforeEach(() => {
    server.use(mockGetFinancialOperationsGeneralView())

    appStore = setupStore({
      app: appConfig({}),
    })

    MOCK_URL_PARAMS = {
      [OperationsReportUrlSearchParams.startDate]: MOCK_DATE,
      [OperationsReportUrlSearchParams.endDate]: MOCK_DATE,
    }
  })

  beforeAll(() => server.listen())

  afterAll(() => {
    server.close()
    jest.resetAllMocks()
  })

  describe('when render content', () => {
    it('should render <OperationsTable /> with correct props', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      const { getByText } = renderOperationsReport()

      await waitForProgressBarComplete()

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      const spotMetricsTable = getByText('OperationsTable')

      expect(spotMetricsTable).toBeInTheDocument()
      expect(spotMetricsTable).toHaveAttribute('data-rows')
    })
  })

  describe('when render "loader"', () => {
    it('should render "loader" when data is loading', async () => {
      renderOperationsReport()

      const loader = screen.getByRole('progressbar')
      expect(loader).toBeInTheDocument()
    })

    it('should not rendered "loader" on successful request', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      renderOperationsReport()

      const loader = screen.getByRole('progressbar')

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      expect(loader).not.toBeInTheDocument()
    })
  })

  describe('when call api', () => {
    it('should call api success ', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      renderOperationsReport()

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      await waitFor(() =>
        expect(
          appStore.getState().api.queries[
            `getFinancialOperationsGeneralView({"dateFrom":"2022-11-30","dateTo":"2022-11-30"})`
          ]?.status,
        ).toEqual('fulfilled'),
      )
    })

    it('should show error message', async () => {
      server.use(mockGetFinancialOperationsGeneralView([], 500))

      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      renderOperationsReport()

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      await waitFor(() => {
        expect(screen.getByText(ERROR_MESSAGE_500)).toBeInTheDocument()
      })
    })

    describe('when filters changed', () => {
      it('should refetch data if "articleId" param was changed', async () => {
        const { rerender } = renderOperationsReport()

        await waitFor(() =>
          expect(
            appStore.getState().api.queries[
              `getFinancialOperationsGeneralView({"dateFrom":"2022-11-30","dateTo":"2022-11-30"})`
            ]?.status,
          ).toEqual('fulfilled'),
        )

        MOCK_URL_PARAMS = {
          ...MOCK_URL_PARAMS,
          [OperationsReportUrlSearchParams.articleId]: '40',
        }

        rerender(<OperationsReport />)

        await waitFor(() =>
          expect(
            appStore.getState().api.queries[
              `getFinancialOperationsGeneralView({"budgetItemId":"40","dateFrom":"2022-11-30","dateTo":"2022-11-30"})`
            ]?.status,
          ).toEqual('fulfilled'),
        )
      })

      it('should refetch data if "contractorId" param was changed', async () => {
        const { rerender } = renderOperationsReport()

        await waitFor(() =>
          expect(
            appStore.getState().api.queries[
              `getFinancialOperationsGeneralView({"dateFrom":"2022-11-30","dateTo":"2022-11-30"})`
            ]?.status,
          ).toEqual('fulfilled'),
        )

        MOCK_URL_PARAMS = {
          ...MOCK_URL_PARAMS,
          [OperationsReportUrlSearchParams.contractorId]: '40',
        }

        rerender(<OperationsReport />)

        await waitFor(() =>
          expect(
            appStore.getState().api.queries[
              `getFinancialOperationsGeneralView({"contractorId":"40","dateFrom":"2022-11-30","dateTo":"2022-11-30"})`
            ]?.status,
          ).toEqual('fulfilled'),
        )
      })

      it('should refetch data if "maxAmount" param was changed', async () => {
        const { rerender } = renderOperationsReport()

        await waitFor(() =>
          expect(
            appStore.getState().api.queries[
              `getFinancialOperationsGeneralView({"dateFrom":"2022-11-30","dateTo":"2022-11-30"})`
            ]?.status,
          ).toEqual('fulfilled'),
        )

        MOCK_URL_PARAMS = {
          ...MOCK_URL_PARAMS,
          [OperationsReportUrlSearchParams.maxAmount]: '100',
        }

        rerender(<OperationsReport />)

        await waitFor(() =>
          expect(
            appStore.getState().api.queries[
              `getFinancialOperationsGeneralView({"amountTo":"100","dateFrom":"2022-11-30","dateTo":"2022-11-30"})`
            ]?.status,
          ).toEqual('fulfilled'),
        )
      })

      it('should refetch data if "minAmount" param was changed', async () => {
        const { rerender } = renderOperationsReport()

        await waitFor(() =>
          expect(
            appStore.getState().api.queries[
              `getFinancialOperationsGeneralView({"dateFrom":"2022-11-30","dateTo":"2022-11-30"})`
            ]?.status,
          ).toEqual('fulfilled'),
        )

        MOCK_URL_PARAMS = {
          ...MOCK_URL_PARAMS,
          [OperationsReportUrlSearchParams.minAmount]: '10',
        }

        rerender(<OperationsReport />)

        await waitFor(() =>
          expect(
            appStore.getState().api.queries[
              `getFinancialOperationsGeneralView({"amountFrom":"10","dateFrom":"2022-11-30","dateTo":"2022-11-30"})`
            ]?.status,
          ).toEqual('fulfilled'),
        )
      })

      it('should refetch data if "operationKind" param was changed', async () => {
        const { rerender } = renderOperationsReport()

        await waitFor(() =>
          expect(
            appStore.getState().api.queries[
              `getFinancialOperationsGeneralView({"dateFrom":"2022-11-30","dateTo":"2022-11-30"})`
            ]?.status,
          ).toEqual('fulfilled'),
        )

        MOCK_URL_PARAMS = {
          ...MOCK_URL_PARAMS,
          [OperationsReportUrlSearchParams.operationKind]: 'WRITE_OFF',
        }

        rerender(<OperationsReport />)

        await waitFor(() =>
          expect(
            appStore.getState().api.queries[
              `getFinancialOperationsGeneralView({"dateFrom":"2022-11-30","dateTo":"2022-11-30","operationKind":"WRITE_OFF"})`
            ]?.status,
          ).toEqual('fulfilled'),
        )
      })

      it('should refetch data if "operationType" param was changed', async () => {
        const { rerender } = renderOperationsReport()

        await waitFor(() =>
          expect(
            appStore.getState().api.queries[
              `getFinancialOperationsGeneralView({"dateFrom":"2022-11-30","dateTo":"2022-11-30"})`
            ]?.status,
          ).toEqual('fulfilled'),
        )

        MOCK_URL_PARAMS = {
          ...MOCK_URL_PARAMS,
          [OperationsReportUrlSearchParams.operationType]: 'PLANNED',
        }

        rerender(<OperationsReport />)

        await waitFor(() =>
          expect(
            appStore.getState().api.queries[
              `getFinancialOperationsGeneralView({"dateFrom":"2022-11-30","dateTo":"2022-11-30","operationType":"PLANNED"})`
            ]?.status,
          ).toEqual('fulfilled'),
        )
      })
    })
  })
})
