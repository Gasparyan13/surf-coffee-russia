import { EOperationsType } from '@common/types/Operations'

import { PATHS } from '@constants'

import { setOperationDrawerState } from '@pages/CreateOperations/redux/createOperation/slice'

import { setupStore } from '@store/rootConfig'

import { appConfig } from '@testEnv/mocks/store/app'
import { act, renderHook } from '@testEnv/utils'

import { SALARY_EXPENSES_IDS } from './constants'
import { useOpenReportCell } from './useOpenReportCell'

const defaultCellHandlerArgs = {
  budgetItemId: 29,
  budgetItemName: 'Техническое обеспечение',
  date: '2022-10-01',
  isEditable: true,
  text: undefined,
  yearMonth: '2022-10',
}

describe('useOpenReportCell()', () => {
  let appStore = setupStore({
    app: appConfig({}),
  })

  const renderUseOpenReportCell = () =>
    renderHook(() => useOpenReportCell(), {
      store: appStore,
    })

  beforeEach(() => {
    appStore = setupStore({
      app: appConfig({}),
    })
  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when render hook', () => {
    test('return default params', async () => {
      const { result } = renderUseOpenReportCell()

      expect(result.current.drawer).toBeNull()
      expect(result.current.isOpen).toEqual(false)
      expect(result.current.reportType).toBeUndefined()
    })

    it('should return drawer data if "handleCellClick" called', async () => {
      const { result } = renderUseOpenReportCell()

      act(() => {
        result.current.handleCellClick('plan')(defaultCellHandlerArgs)
      })

      expect(result.current.drawer).toEqual({
        budgetItemId: 29,
        budgetItemName: 'Техническое обеспечение',
        date: '2022-10-01',
        drawerType: 'PlanOperations',
        planOrFactType: 'plan',
        text: undefined,
        yearMonth: '2022-10',
      })
    })

    it('should clear drawer data if "handleDrawerClose" called', async () => {
      const { result } = renderUseOpenReportCell()

      act(() => {
        result.current.handleCellClick('plan')(defaultCellHandlerArgs)
      })

      expect(result.current.drawer).not.toBeNull()

      act(() => {
        result.current.handleDrawerClose()
      })

      expect(result.current.drawer).toBeNull()
    })

    describe('when "reportType" depending on pathname', () => {
      it('should return "cashFlow" type if pathname contain cash flow url', async () => {
        window.history.pushState({}, 'Test', PATHS.financialReports.cashFlow)

        const { result } = renderUseOpenReportCell()

        expect(result.current.reportType).toEqual('cashFlow')
      })

      it('should return "pnl" type if pathname contain pnl url', async () => {
        window.history.pushState({}, 'Test', PATHS.financialReports.pnl)

        const { result } = renderUseOpenReportCell()

        expect(result.current.reportType).toEqual('pnl')
      })

      it('should return undefined if pathname contain any other url', async () => {
        window.history.pushState({}, 'Test', PATHS.financialReports.balance)

        const { result } = renderUseOpenReportCell()

        expect(result.current.reportType).toBeUndefined()
      })
    })

    describe('when "isOpen" depending on edit operation drawer open state', () => {
      it('should return "true" if edit operation drawer is closed', async () => {
        appStore.dispatch(setOperationDrawerState(null))

        const { result } = renderUseOpenReportCell()

        act(() => {
          result.current.handleCellClick('plan')(defaultCellHandlerArgs)
        })

        expect(result.current.isOpen).toEqual(true)
      })

      it('should return "false" if edit operation drawer is opened', async () => {
        appStore.dispatch(
          setOperationDrawerState({
            type: EOperationsType.ServiceAct,
            title: 'test',
          }),
        )

        const { result } = renderUseOpenReportCell()

        act(() => {
          result.current.handleCellClick('plan')(defaultCellHandlerArgs)
        })

        expect(result.current.isOpen).toEqual(true)
      })
    })

    describe('when return different drawer types', () => {
      it('should open "WageFund" drawer if SALARY_EXPENSES_IDS include budgetItemId', async () => {
        const { result } = renderUseOpenReportCell()

        act(() => {
          result.current.handleCellClick('plan')({
            ...defaultCellHandlerArgs,
            budgetItemId: SALARY_EXPENSES_IDS[0],
          })
        })

        expect(result.current.drawer?.drawerType).toEqual('WageFund')
      })

      it('should open "PlanOperations" drawer if cell has "plan" type', async () => {
        const { result } = renderUseOpenReportCell()

        act(() => {
          result.current.handleCellClick('plan')(defaultCellHandlerArgs)
        })

        expect(result.current.drawer?.drawerType).toEqual('PlanOperations')
      })

      it('should open "FactOperations" drawer if cell has "fact" type', async () => {
        const { result } = renderUseOpenReportCell()

        act(() => {
          result.current.handleCellClick('fact')(defaultCellHandlerArgs)
        })

        expect(result.current.drawer?.drawerType).toEqual('FactOperations')
      })
    })
  })
})
