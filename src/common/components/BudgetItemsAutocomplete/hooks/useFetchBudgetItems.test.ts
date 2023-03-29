import { GetPrepaymentBudgetItemsApiArg } from '@rtkApi/modules/__generated__/prepayment'

import { successGetPrepaymentBudgetItems } from '@testEnv/mocks/api/prepayment'
import { setupServer, waitForRequest } from '@testEnv/server'
import { mockGetPrepaymentBudgetItemsResponse } from '@testEnv/server/handlers/prepayment'
import { renderHook, waitFor } from '@testEnv/utils'

import { useFetchBudgetItems } from './useFetchBudgetItems'

const createServer = () =>
  setupServer(
    mockGetPrepaymentBudgetItemsResponse(successGetPrepaymentBudgetItems),
  )

describe('useFetchBudgetItems()', () => {
  const server = createServer()
  let isPurchaseValue = false
  let operationTypeValue: GetPrepaymentBudgetItemsApiArg['operationType'] =
    'CASH_ORDER'

  const renderUseFetchBudgetItems = () =>
    renderHook(() =>
      useFetchBudgetItems({
        isPurchase: isPurchaseValue,
        operationType: operationTypeValue,
      }),
    )

  beforeAll(() => server.listen())
  afterAll(() => server.close())

  beforeEach(() => {
    isPurchaseValue = false
    operationTypeValue = 'CASH_ORDER'
  })

  afterEach(() => {
    jest.resetAllMocks()
    server.resetHandlers()
    server.events.removeAllListeners('request:end')
  })

  it('should make request to get all articles', async () => {
    const requestSpy = jest.fn()

    server.events.on('request:end', requestSpy)

    renderUseFetchBudgetItems()

    await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
  })

  describe('when operationType and isPurchase props is passed', () => {
    test('should be request with query params - isPurchase=false, operationType="CASH_ORDER"', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      renderUseFetchBudgetItems()

      const pendingGetBudgetItemstRequest = waitForRequest(
        server,
        'GET',
        /prepayment\/budget_items/,
      )

      const getBudgetItemsRequest = await pendingGetBudgetItemstRequest

      const isPurchaseQuery =
        getBudgetItemsRequest.url.searchParams.get('isPurchase')
      const operationTypeQuery =
        getBudgetItemsRequest.url.searchParams.get('operationType')

      expect(isPurchaseQuery).toBe('false')
      expect(operationTypeQuery).toBe('CASH_ORDER')
      expect(requestSpy).toBeCalledTimes(1)
    })

    test('should be request with query params - isPurchase=true, operationType="WAYBILL"', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      isPurchaseValue = true
      operationTypeValue = 'WAYBILL'

      renderUseFetchBudgetItems()

      const pendingGetBudgetItemstRequest = waitForRequest(
        server,
        'GET',
        /prepayment\/budget_items/,
      )

      const getBudgetItemsRequest = await pendingGetBudgetItemstRequest

      const isPurchaseQuery =
        getBudgetItemsRequest.url.searchParams.get('isPurchase')
      const operationTypeQuery =
        getBudgetItemsRequest.url.searchParams.get('operationType')

      expect(isPurchaseQuery).toBe('true')
      expect(operationTypeQuery).toBe('WAYBILL')
      expect(requestSpy).toBeCalledTimes(1)
    })

    it('should make request if isPurchase prop was changed', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      const { rerender } = renderUseFetchBudgetItems()

      const pendingGetBudgetItemstFirstRequest = waitForRequest(
        server,
        'GET',
        /prepayment\/budget_items/,
      )

      const getBudgetItemsFirstRequest =
        await pendingGetBudgetItemstFirstRequest

      expect(
        getBudgetItemsFirstRequest.url.searchParams.get('isPurchase'),
      ).toBe('false')
      expect(
        getBudgetItemsFirstRequest.url.searchParams.get('operationType'),
      ).toBe('CASH_ORDER')

      expect(requestSpy).toBeCalledTimes(1)

      isPurchaseValue = true

      rerender()

      const pendingGetBudgetItemstSecondRequest = waitForRequest(
        server,
        'GET',
        /prepayment\/budget_items/,
      )

      const getBudgetItemsSecondRequest =
        await pendingGetBudgetItemstSecondRequest

      expect(
        getBudgetItemsSecondRequest.url.searchParams.get('isPurchase'),
      ).toBe('true')
      expect(
        getBudgetItemsSecondRequest.url.searchParams.get('operationType'),
      ).toBe('CASH_ORDER')

      expect(requestSpy).toBeCalledTimes(2)
    })

    it('should make request if operationType prop was changed', async () => {
      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      const { rerender } = renderUseFetchBudgetItems()

      const pendingGetBudgetItemstFirstRequest = waitForRequest(
        server,
        'GET',
        /prepayment\/budget_items/,
      )

      const getBudgetItemsFirstRequest =
        await pendingGetBudgetItemstFirstRequest

      expect(
        getBudgetItemsFirstRequest.url.searchParams.get('isPurchase'),
      ).toBe('false')
      expect(
        getBudgetItemsFirstRequest.url.searchParams.get('operationType'),
      ).toBe('CASH_ORDER')

      expect(requestSpy).toBeCalledTimes(1)

      operationTypeValue = 'WAYBILL'

      rerender()

      const pendingGetBudgetItemstSecondRequest = waitForRequest(
        server,
        'GET',
        /prepayment\/budget_items/,
      )

      const getBudgetItemsSecondRequest =
        await pendingGetBudgetItemstSecondRequest

      expect(
        getBudgetItemsSecondRequest.url.searchParams.get('isPurchase'),
      ).toBe('false')
      expect(
        getBudgetItemsSecondRequest.url.searchParams.get('operationType'),
      ).toBe('WAYBILL')

      expect(requestSpy).toBeCalledTimes(2)
    })
  })

  it('should return articles and loading value', async () => {
    const requestSpy = jest.fn()

    server.events.on('request:end', requestSpy)

    const { result } = renderUseFetchBudgetItems()

    expect(result.current[1]).toEqual(true)

    await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

    expect(result.current.length).toEqual(2)
    expect(result.current[0]?.length).toEqual(8)
    expect(result.current[0]).toEqual(successGetPrepaymentBudgetItems)
    expect(result.current[1]).toEqual(false)
  })

  it('should return empty budgetItems if request fail', async () => {
    server.use(mockGetPrepaymentBudgetItemsResponse([], 500))

    const requestSpy = jest.fn()

    server.events.on('request:end', requestSpy)

    const { result } = renderUseFetchBudgetItems()

    expect(result.current[1]).toEqual(true)

    const pendingGetBudgetItemstRequest = waitForRequest(
      server,
      'GET',
      /prepayment\/budget_items/,
    )

    await pendingGetBudgetItemstRequest
    expect(requestSpy).toHaveBeenCalledTimes(1)

    expect(result.current[0]).toBeUndefined()
  })
})
