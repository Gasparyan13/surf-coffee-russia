import React from 'react'

import { ERROR_MESSAGE_500 } from '@constants'

import { setupStore } from '@store/rootConfig'

import { successGetMetricsForecast } from '@testEnv/mocks/api/metrics'
import { appConfig, enterpriseId } from '@testEnv/mocks/store/app'
import { setupServer } from '@testEnv/server'
import { mockApiGetMetricForecast } from '@testEnv/server/handlers/metrics'
import {
  render,
  screen,
  waitFor,
  waitForProgressBarComplete,
} from '@testEnv/utils'

import { Props as SpotMetricsTableProps } from '../SpotMetricsTable/SpotMetricsTable.types'
import { SpotMetricsReport } from './SpotMetricsReport'

jest.mock('../SpotMetricsTable', () => ({
  SpotMetricsTable: ({ date, rows }: SpotMetricsTableProps) => (
    <div data-date={date} data-rows={rows}>
      SpotMetricsTable
    </div>
  ),
}))

const createServer = () =>
  setupServer(mockApiGetMetricForecast(successGetMetricsForecast, 200))

describe('<SpotMetricsReport />', () => {
  const server = createServer()

  let appStore = setupStore({
    app: appConfig({}),
  })

  beforeEach(() => {
    appStore = setupStore({
      app: appConfig({}),
    })
  })

  beforeAll(() => server.listen())
  afterAll(() => server.close())

  const renderSpotMetricsReport = () =>
    render(<SpotMetricsReport />, { store: appStore })

  afterEach(() => {
    jest.resetAllMocks()
    server.events.removeAllListeners('request:end')
    server.resetHandlers()
  })

  describe('when render content', () => {
    it('should render <SpotMetricsCard /> with correct props', async () => {
      const { getByText } = renderSpotMetricsReport()

      await waitForProgressBarComplete()

      expect(getByText('Выручка за 13 ноября')).toBeInTheDocument()
      expect(getByText('100 000')).toBeInTheDocument()
      expect(getByText('₽')).toBeInTheDocument()
    })

    it('should NOT render <SpotMetricsCard /> if data is empty', async () => {
      server.use(mockApiGetMetricForecast(successGetMetricsForecast, 404))

      const { getByText, queryByText } = renderSpotMetricsReport()

      await waitForProgressBarComplete()

      expect(queryByText('Выручка за 13 ноября')).not.toBeInTheDocument()
      expect(queryByText('100 000')).not.toBeInTheDocument()
      expect(queryByText('₽')).not.toBeInTheDocument()
      expect(getByText('Нет данных по метрикам')).toBeInTheDocument()
    })

    it('should render <SpotMetricsTable /> with correct props', async () => {
      const { getByText } = renderSpotMetricsReport()

      await waitForProgressBarComplete()

      const spotMetricsTable = getByText('SpotMetricsTable')

      expect(spotMetricsTable).toBeInTheDocument()
      expect(spotMetricsTable).toHaveAttribute('data-date')
      expect(spotMetricsTable).toHaveAttribute('data-rows')
    })
  })

  describe('when render "loader" ', () => {
    it('should render "loader" when data is loaded', async () => {
      renderSpotMetricsReport()

      const loader = screen.getByRole('progressbar')
      expect(loader).toBeInTheDocument()
    })

    it('should not rendered "loader" on successful request', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      renderSpotMetricsReport()

      const loader = screen.getByRole('progressbar')

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      expect(loader).not.toBeInTheDocument()
    })
  })

  describe('when call api ', () => {
    it('should call api success ', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      renderSpotMetricsReport()

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      await waitFor(() =>
        expect(
          appStore.getState().api.queries[
            `getMetricForecast({"enterpriseId":${enterpriseId}})`
          ]?.status,
        ).toEqual('fulfilled'),
      )
    })

    it('should show error message status 500', async () => {
      server.use(mockApiGetMetricForecast(successGetMetricsForecast, 500))

      const requestSpy = jest.fn()

      server.events.on('request:end', requestSpy)

      renderSpotMetricsReport()

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      await waitFor(() => {
        expect(screen.getByText(ERROR_MESSAGE_500)).toBeInTheDocument()
      })
    })
  })
})
