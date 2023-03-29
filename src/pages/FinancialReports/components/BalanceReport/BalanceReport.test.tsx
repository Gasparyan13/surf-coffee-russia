import React from 'react'

import { DEFAULT_DATE_FORMAT } from '@common/constants'

import { DateHelper } from '@helpers'

import { getYearMonth } from '@utils'

import { setupStore } from '@store/rootConfig'

import {
  getAnalyticsBalanceSheetByEnterpriseIdApiResponse,
  getAnalyticsBalanceSheetByEnterpriseIdApiResponsePastMonth,
  getAnalyticsBalanceSheetByEnterpriseIdApiResponseSumMismatch,
  getAnalyticsBalanceSheetByEnterpriseIdApiResponseSumMismatchPastMonth,
} from '@testEnv/mocks/api/analytics'
import { CURRENT_MONTH_YEAR_MOCK_URL_PARAMS } from '@testEnv/mocks/constants/url'
import { mockUseDelayedRender } from '@testEnv/mocks/hooks/useDelayedRender'
import { mockUseWindowSize } from '@testEnv/mocks/hooks/useWindowSize'
import {
  configFinReportCtxValue,
  ConfigFinReportCtxValueParams,
} from '@testEnv/mocks/providers/financialReportProvider'
import { appConfig, enterpriseId } from '@testEnv/mocks/store/app'
import { financialReportConfig } from '@testEnv/mocks/store/financialReport'
import { setupServer } from '@testEnv/server'
import { mockGetAnalyticsBalanceSheetByEnterpriseId } from '@testEnv/server/handlers/analytics'
import {
  render,
  screen,
  waitFor,
  waitForProgressBarComplete,
} from '@testEnv/utils'

import { FinancialReportProvider } from '../../containers/FinancialReportCtx'
import { TEST_ID_SIDEBAR_FOOTER_CELL } from '../TableBody/components/SidebarFooterCell/constants/testIds'
import { TEST_ID_TOTAL_BALANCE_CELL } from '../TableBody/components/TotalBalanceDataCell/constants/testIds'
import { TEST_ID_TOTAL_BALANCE_FOOTER_CELL } from '../TableBody/components/TotalBalanceFooterCell/constants/testIds'
import { BalanceReport } from './BalanceReport'
import { HEADER_INFO_DATE_FORMAT } from './constants'
import { getFormattedBalanceItems } from './utils/getters'

const MOCK_URL_PARAMS = {
  ...CURRENT_MONTH_YEAR_MOCK_URL_PARAMS,
}
const MOCK_PERIOD = `${MOCK_URL_PARAMS.year}-${MOCK_URL_PARAMS.month}`
const reportDate = DateHelper.toLocaleFormat(
  DateHelper.getEndOfMonth(new Date()),
  HEADER_INFO_DATE_FORMAT,
)

jest.mock('@hooks', () => ({
  useLocationQuery: () => ({
    get: (key: keyof typeof MOCK_URL_PARAMS) => MOCK_URL_PARAMS[key],
  }),
  useWindowSize: mockUseWindowSize(),
  useDelayedRender: mockUseDelayedRender(true),
}))

const createServer = () =>
  setupServer(mockGetAnalyticsBalanceSheetByEnterpriseId())

describe('<BalanceReport />', () => {
  const server = createServer()

  let appStore = setupStore({
    app: appConfig({}),
    financialReport: financialReportConfig({}),
  })

  // not real mock
  // just disable "buffer set: 0" messages on tests
  // provided by "getBufferRowCount (node_modules/fixed-data-table-2/internal/selectors/roughHeights.js:185:13)"
  const log = jest.spyOn(console, 'log').mockImplementation(() => {})

  const wrapper = (params: ConfigFinReportCtxValueParams) => (
    <FinancialReportProvider
      value={{ ...configFinReportCtxValue({}), ...params }}>
      <BalanceReport />
    </FinancialReportProvider>
  )

  const renderBalanceReport = (params: ConfigFinReportCtxValueParams) =>
    render(wrapper(params), { store: appStore })

  beforeAll(() => server.listen())
  afterAll(() => {
    log.mockClear()
    server.close()
  })

  beforeEach(() => {
    appStore = setupStore({ app: appConfig({}) })
  })

  afterEach(() => {
    MOCK_URL_PARAMS.month = CURRENT_MONTH_YEAR_MOCK_URL_PARAMS.month
    MOCK_URL_PARAMS.year = CURRENT_MONTH_YEAR_MOCK_URL_PARAMS.year

    jest.resetAllMocks()
    server.events.removeAllListeners('request:end')
    server.resetHandlers()
  })

  describe('when render "BalanceReport" first time', () => {
    it('should send "AnalyticsBalanceSheetByEnterpriseId" request', async () => {
      renderBalanceReport({})

      await waitFor(() =>
        expect(
          appStore.getState().api.queries[
            `getAnalyticsBalanceSheetByEnterpriseId({"enterpriseId":${enterpriseId},"period":"${MOCK_PERIOD}"})`
          ]?.status,
        ).toEqual('fulfilled'),
      )
    })

    it('should save last request args to store', async () => {
      renderBalanceReport({})

      expect(appStore.getState().financialReport.lastReportReqArgs).toEqual({
        enterpriseId,
        period: `${MOCK_PERIOD}`,
      })
    })

    describe('when trigger "handleShowMessage"', () => {
      describe('when show "warning" message', () => {
        beforeEach(() => {
          server.use(
            mockGetAnalyticsBalanceSheetByEnterpriseId(
              getAnalyticsBalanceSheetByEnterpriseIdApiResponseSumMismatch,
            ),
          )
        })

        test('show balance mismatch message for received date', async () => {
          const handleShowMessage = jest.fn(() => {})

          renderBalanceReport(configFinReportCtxValue({ handleShowMessage }))

          await waitFor(() =>
            expect(handleShowMessage).toHaveBeenCalledTimes(1),
          )
          await waitFor(() =>
            expect(handleShowMessage).toBeCalledWith({
              text: `на ${reportDate} суммы баланса по обязательствам и активам не совпадают!`,
              type: 'warning',
            }),
          )
        })

        test('show balance mismatch message for previous date', async () => {
          server.use(
            mockGetAnalyticsBalanceSheetByEnterpriseId(
              getAnalyticsBalanceSheetByEnterpriseIdApiResponseSumMismatchPastMonth,
            ),
          )
          const handleShowMessage = jest.fn(() => {})
          const pastMonth = new Date()
          pastMonth.setDate(1)
          pastMonth.setMonth(pastMonth.getMonth() - 1)

          const [year, month] = getYearMonth(pastMonth)

          MOCK_URL_PARAMS.month = month
          MOCK_URL_PARAMS.year = year

          renderBalanceReport(configFinReportCtxValue({ handleShowMessage }))

          await waitFor(() =>
            expect(handleShowMessage).toHaveBeenCalledTimes(1),
          )
          await waitFor(() =>
            expect(handleShowMessage).toBeCalledWith({
              text: `на ${DateHelper.toLocaleFormat(
                DateHelper.getEndOfMonth(`${year}-${month}-01`),
                HEADER_INFO_DATE_FORMAT,
              )} суммы баланса по обязательствам и активам не совпадают!`,
              type: 'warning',
            }),
          )
        })
      })

      describe('when show "info" message', () => {
        test('show balance match message for current date', async () => {
          const handleShowMessage = jest.fn(() => {})

          renderBalanceReport(configFinReportCtxValue({ handleShowMessage }))

          await waitFor(() =>
            expect(handleShowMessage).toHaveBeenCalledTimes(1),
          )
          await waitFor(() =>
            expect(handleShowMessage).toBeCalledWith({
              text: `на ${reportDate}`,
              type: 'info',
            }),
          )
        })

        test('show balance match message for previous date', async () => {
          server.use(
            mockGetAnalyticsBalanceSheetByEnterpriseId(
              getAnalyticsBalanceSheetByEnterpriseIdApiResponsePastMonth,
            ),
          )
          const handleShowMessage = jest.fn(() => {})
          const pastMonth = new Date()
          pastMonth.setDate(1)
          pastMonth.setMonth(pastMonth.getMonth() - 1)

          const [year, month] = getYearMonth(pastMonth)

          MOCK_URL_PARAMS.month = month
          MOCK_URL_PARAMS.year = year

          renderBalanceReport(configFinReportCtxValue({ handleShowMessage }))

          await waitFor(() =>
            expect(handleShowMessage).toHaveBeenCalledTimes(1),
          )
          await waitFor(() =>
            expect(handleShowMessage).toBeCalledWith({
              text: `на ${DateHelper.toLocaleFormat(
                DateHelper.getEndOfMonth(`${year}-${month}-01`),
                HEADER_INFO_DATE_FORMAT,
              )}`,
              type: 'info',
            }),
          )
        })
      })
    })
  })

  describe('when render table', () => {
    describe('when render "sidebar" column', () => {
      it('should render header', async () => {
        renderBalanceReport({})

        await waitForProgressBarComplete()

        expect(screen.getByText('Статьи')).toBeInTheDocument()
      })

      it('should render "budgetItemNames"', async () => {
        const budgetItems = getFormattedBalanceItems(
          getAnalyticsBalanceSheetByEnterpriseIdApiResponse,
        )

        renderBalanceReport({})

        await waitForProgressBarComplete()

        budgetItems.forEach(({ budgetItemName }) => {
          expect(screen.getByText(budgetItemName!)).toBeInTheDocument()
        })
      })

      it('should render footer', async () => {
        renderBalanceReport({})

        await waitForProgressBarComplete()

        expect(
          screen.getByTestId(TEST_ID_SIDEBAR_FOOTER_CELL),
        ).toBeInTheDocument()
      })
    })

    describe('when render "total" columns', () => {
      const data = getAnalyticsBalanceSheetByEnterpriseIdApiResponse!
      const periodStartDate = DateHelper.toFormat(
        data.periodStartSheet!.periodDate!,
        DEFAULT_DATE_FORMAT,
      )
      const periodEndDate = DateHelper.toFormat(
        data.periodEndSheet!.periodDate!,
        DEFAULT_DATE_FORMAT,
      )

      describe('when render "start" column', () => {
        it('should render correct title', async () => {
          renderBalanceReport({})

          await waitForProgressBarComplete()

          expect(screen.getByText(periodStartDate)).toBeInTheDocument()
        })

        it('should render DOM node for each budgetItem', async () => {
          const budgetItems = getFormattedBalanceItems(
            getAnalyticsBalanceSheetByEnterpriseIdApiResponse,
          )

          renderBalanceReport({})

          await waitForProgressBarComplete()

          budgetItems.forEach(({ budgetItemName }) => {
            expect(
              screen.getByTestId(
                `${TEST_ID_TOTAL_BALANCE_CELL}-totalStart-${budgetItemName}`,
              ),
            ).toBeInTheDocument()
          })
        })

        it('should render footer cell', async () => {
          renderBalanceReport({})

          await waitForProgressBarComplete()

          expect(
            screen.getByTestId(
              `${TEST_ID_TOTAL_BALANCE_FOOTER_CELL}-totalStart`,
            ),
          ).toBeInTheDocument()
        })
      })

      describe('when render "end" column', () => {
        it('should render correct title', async () => {
          renderBalanceReport({})

          await waitForProgressBarComplete()

          expect(screen.getByText(periodEndDate)).toBeInTheDocument()
        })

        it('should render DOM node for each budgetItem', async () => {
          const budgetItems = getFormattedBalanceItems(
            getAnalyticsBalanceSheetByEnterpriseIdApiResponse,
          )

          renderBalanceReport({})

          await waitForProgressBarComplete()

          budgetItems.forEach(({ budgetItemName }) => {
            expect(
              screen.getByTestId(
                `${TEST_ID_TOTAL_BALANCE_CELL}-totalEnd-${budgetItemName}`,
              ),
            ).toBeInTheDocument()
          })
        })

        it('should render footer cell', async () => {
          renderBalanceReport({})

          await waitForProgressBarComplete()

          expect(
            screen.getByTestId(`${TEST_ID_TOTAL_BALANCE_FOOTER_CELL}-totalEnd`),
          ).toBeInTheDocument()
        })
      })
    })
  })
})
