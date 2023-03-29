import React from 'react'

import { MONTH_YEAR_FORMAT, PATHS } from '@common/constants'
import { getYearMonth } from '@common/utils'

import { DateHelper } from '@helpers'

import { adapterLocale } from '@uiKit/components/DatePicker/constants/adapterLocale'
import { Props as ListRowProps } from '@uiKit/components/ListRow/ListRow.types'

import { setupStore } from '@store/rootConfig'

import { getAnalyticsBalanceSheetByEnterpriseIdApiResponseSumMismatch } from '@testEnv/mocks/api/analytics'
import { CURRENT_MONTH_YEAR_MOCK_URL_PARAMS } from '@testEnv/mocks/constants/url'
import {
  configFinReportCtxValue,
  ConfigFinReportCtxValueParams,
} from '@testEnv/mocks/providers/financialReportProvider'
import { appConfig, enterpriseId } from '@testEnv/mocks/store/app'
import { financialReportConfig } from '@testEnv/mocks/store/financialReport'
import { setupServer, waitForRequest } from '@testEnv/server'
import {
  mockGetAnalyticsBalanceSheetByEnterpriseId,
  mockPostAnalyticsBalanceSheetActionsClosePeriod,
} from '@testEnv/server/handlers/analytics'
import { act, fireEvent, render, screen, waitFor } from '@testEnv/utils'

import { FinancialReportProvider } from '../../containers/FinancialReportCtx'
import { FinReportHeader } from './FinReportHeader'
import { ERROR_MESSAGE_CLOSE_PERIOD } from './constants/messages/error'
import { SUCCESS_MESSAGE_CLOSE_PERIOD } from './constants/messages/success'
import { yearOptions } from './constants/options'

let MOCK_URL_PARAMS: Record<string, string> = {
  ...CURRENT_MONTH_YEAR_MOCK_URL_PARAMS,
}

jest.mock('@hooks', () => ({
  useLocationQuery: () => ({
    get: (key: keyof typeof MOCK_URL_PARAMS) => MOCK_URL_PARAMS[key],
  }),
}))

const createServer = () => setupServer()

describe('<FinReportHeader />', () => {
  const server = createServer()

  let appStore = setupStore({
    app: appConfig({}),
    financialReport: financialReportConfig({}),
  })

  const wrapper = (params: ConfigFinReportCtxValueParams) => (
    <FinancialReportProvider
      value={{ ...configFinReportCtxValue({}), ...params }}>
      <FinReportHeader />
    </FinancialReportProvider>
  )

  const renderFinReportHeader = (params: ConfigFinReportCtxValueParams) =>
    render(wrapper(params), { store: appStore })

  beforeAll(() => server.listen())
  afterAll(() => server.close())

  describe('when render reports toggle', () => {
    test('render toggle content', async () => {
      renderFinReportHeader(configFinReportCtxValue({}))

      expect(screen.getAllByRole('tab').length).toEqual(3)
      expect(screen.getByRole('tab', { name: 'P&L' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'ОДДС' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Баланс' })).toBeInTheDocument()
    })

    it('should clear message if tab was changed', async () => {
      const mockHandleShowMessage = jest.fn()

      renderFinReportHeader(
        configFinReportCtxValue({ handleShowMessage: mockHandleShowMessage }),
      )

      fireEvent.click(screen.getByRole('tab', { name: 'ОДДС' }))

      expect(mockHandleShowMessage).toHaveBeenCalledWith(null)
    })

    it('should change URL if tab was changed', async () => {
      window.history.pushState({}, 'Test', PATHS.financialReports.pnl)

      renderFinReportHeader(configFinReportCtxValue({}))

      expect(window.location.pathname).toEqual(PATHS.financialReports.pnl)

      fireEvent.click(screen.getByRole('tab', { name: 'ОДДС' }))

      expect(window.location.pathname).toEqual(PATHS.financialReports.cashFlow)
    })
  })

  describe('when "Balance" page is displayed', () => {
    const MOCK_PERIOD = `${MOCK_URL_PARAMS.year}-${MOCK_URL_PARAMS.month}`

    beforeEach(() => {
      appStore = setupStore({
        app: appConfig({}),
        financialReport: financialReportConfig({
          lastReportReqArgs: {
            enterpriseId: 1,
            period: MOCK_PERIOD,
          },
        }),
      })

      window.history.pushState({}, 'Test', PATHS.financialReports.balance)

      MOCK_URL_PARAMS = {
        ...CURRENT_MONTH_YEAR_MOCK_URL_PARAMS,
      }
    })

    describe('when show "Закрыть период" button', () => {
      it('should display a button if current month is set', async () => {
        renderFinReportHeader(configFinReportCtxValue({}))

        expect(
          screen.getByRole('button', { name: 'Закрыть период' }),
        ).toBeInTheDocument()
      })

      it('should display a button if previous month is set', async () => {
        const pastMonth = new Date()
        pastMonth.setDate(1)
        pastMonth.setMonth(pastMonth.getMonth() - 1)

        const [year, month] = getYearMonth(pastMonth)

        MOCK_URL_PARAMS.month = month
        MOCK_URL_PARAMS.year = year

        renderFinReportHeader(configFinReportCtxValue({}))

        expect(
          screen.getByRole('button', { name: 'Закрыть период' }),
        ).toBeInTheDocument()
      })

      it('should not display a button if the month before previous is set', async () => {
        const beforePastMonth = new Date()
        beforePastMonth.setDate(1)
        beforePastMonth.setMonth(beforePastMonth.getMonth() - 2)

        const [year, month] = getYearMonth(beforePastMonth)

        MOCK_URL_PARAMS.month = month
        MOCK_URL_PARAMS.year = year

        renderFinReportHeader(configFinReportCtxValue({}))

        expect(
          screen.queryByRole('button', { name: 'Закрыть период' }),
        ).not.toBeInTheDocument()
      })
    })

    describe('when click "Закрыть период" button', () => {
      describe('when the period closed successfully', () => {
        beforeEach(() => {
          server.use(
            mockPostAnalyticsBalanceSheetActionsClosePeriod(
              SUCCESS_MESSAGE_CLOSE_PERIOD,
            ),
          )
          server.use(
            mockGetAnalyticsBalanceSheetByEnterpriseId(
              getAnalyticsBalanceSheetByEnterpriseIdApiResponseSumMismatch,
            ),
          )
        })

        it('should call API and update table data', async () => {
          const requestSpy = jest.fn()

          const { user } = renderFinReportHeader(configFinReportCtxValue({}))

          const closePeriodButton = screen.getByRole('button', {
            name: 'Закрыть период',
          })

          expect(closePeriodButton).toBeInTheDocument()

          const pendingClosePeriodRequest = waitForRequest(
            server,
            'POST',
            /analytics\/balance_sheet\/actions\/close_period/,
          )

          server.events.on('request:end', requestSpy)

          await act(async () => user.click(closePeriodButton))

          const closePeriodReq = await (await pendingClosePeriodRequest).json()

          await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

          expect(closePeriodReq).toEqual({
            enterpriseId: enterpriseId!,
            period: MOCK_PERIOD,
          })

          await waitFor(() =>
            expect(
              appStore.getState().api.queries[
                `getAnalyticsBalanceSheetByEnterpriseId({"enterpriseId":${enterpriseId},"period":"${MOCK_PERIOD}"})`
              ]?.status,
            ).toEqual('fulfilled'),
          )
        })

        it('should show succsess message', async () => {
          const { user } = renderFinReportHeader(configFinReportCtxValue({}))

          const closePeriodButton = screen.getByRole('button', {
            name: 'Закрыть период',
          })

          await user.click(closePeriodButton)

          const toast = await screen.findByText(SUCCESS_MESSAGE_CLOSE_PERIOD)

          expect(toast).toContainHTML(SUCCESS_MESSAGE_CLOSE_PERIOD)
        })
      })
    })

    describe('when the period closed with error', () => {
      beforeEach(() => {
        server.use(
          mockPostAnalyticsBalanceSheetActionsClosePeriod(
            ERROR_MESSAGE_CLOSE_PERIOD,
            400,
          ),
        )
      })

      it('should show error message', async () => {
        const { user } = renderFinReportHeader(configFinReportCtxValue({}))

        const closePeriodButton = screen.getByRole('button', {
          name: 'Закрыть период',
        })

        await user.click(closePeriodButton)

        const toast = await screen.findByText(ERROR_MESSAGE_CLOSE_PERIOD)

        expect(toast).toContainHTML(ERROR_MESSAGE_CLOSE_PERIOD)
      })
    })

    describe('When show "YearMonthUrlDatePicker"', () => {
      it('should render "DatePicker"', async () => {
        renderFinReportHeader(configFinReportCtxValue({}))

        expect(
          screen.getByPlaceholderText('Выберите период'),
        ).toBeInTheDocument()
      })

      it('should read "month" and "year" from URL', async () => {
        renderFinReportHeader(configFinReportCtxValue({}))

        const currentYearMonthString = DateHelper.toLocaleFormat(
          new Date(),
          MONTH_YEAR_FORMAT,
          { locale: adapterLocale },
        )

        expect(screen.getByPlaceholderText('Выберите период')).toHaveValue(
          currentYearMonthString,
        )
      })
    })
  })

  describe('when "PnL" or "CashFlow" pages is displayed', () => {
    beforeEach(() => {
      appStore = setupStore({
        app: appConfig({}),
        financialReport: financialReportConfig({}),
      })

      window.history.pushState({}, 'Test', PATHS.financialReports.pnl)

      MOCK_URL_PARAMS = {}
    })

    it('should render date select', async () => {
      const ctx = configFinReportCtxValue({})

      renderFinReportHeader(ctx)

      expect(screen.getByText(`${ctx.year} год`)).toBeInTheDocument()
    })

    describe('when render year select value', () => {
      it('should render next year option', async () => {
        const ctx = configFinReportCtxValue({})

        renderFinReportHeader(ctx)

        fireEvent.mouseDown(screen.getByRole('button'))

        const nextYear = ctx.year + 1
        const nextYearLabel = `${nextYear} год`

        await waitFor(async () => {
          expect(screen.getByText(nextYearLabel)).toBeInTheDocument()
        })
      })

      it('should render past 10 years options', async () => {
        const ctx = configFinReportCtxValue({})

        renderFinReportHeader(ctx)

        const pastTenYearsOptions = yearOptions.reduce<ListRowProps[]>(
          (acc, option) => (option.value! < ctx.year ? [...acc, option] : acc),
          [],
        )

        fireEvent.mouseDown(screen.getByRole('button'))

        await waitFor(async () => {
          expect(
            screen.getByText(`${pastTenYearsOptions[0].text}`),
          ).toBeInTheDocument()
        })

        pastTenYearsOptions.forEach((option) => {
          expect(screen.getByText(`${option.text}`)).toBeInTheDocument()
        })
      })

      it('should change year when change date select value', async () => {
        const mockHandleChangeYear = jest.fn()

        const ctx = configFinReportCtxValue({
          handleChangeYear: mockHandleChangeYear,
        })

        renderFinReportHeader(ctx)

        fireEvent.mouseDown(screen.getByRole('button'))

        const nextYear = ctx.year + 1
        const nextYearLabel = `${nextYear} год`

        await waitFor(async () => {
          expect(screen.getByText(nextYearLabel)).toBeInTheDocument()
        })

        fireEvent.click(screen.getByText(nextYearLabel))

        expect(mockHandleChangeYear).toHaveBeenCalledWith(nextYear)
      })
    })
  })
})
