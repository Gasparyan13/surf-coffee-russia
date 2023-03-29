import React from 'react'

import { ERROR_MESSAGE_500 } from '@common/constants/messages/responseError'
import { DateHelper } from '@common/helpers'

import {
  successGetFinancialOperationsByOperationIdFullApiResponse,
  successGetFinancialOperationsByOperationIdIsCapitalAssets,
} from '@testEnv/mocks/api/financial'
import { setupServer } from '@testEnv/server'
import { mockGetFinancialOperationsByOperationId } from '@testEnv/server/handlers/financial'
import { render, renderHook, waitFor } from '@testEnv/utils'

import { useEditOperationFormData } from './useEditOperationFormData'
import * as T from './useEditOperationFormData.types'

const MockComponent: React.FC<Partial<T.UseEditOperationFormDataParams>> = ({
  editOperationId,
  onDisabled = () => {},
  onFormDataLoadComplete = () => {},
}) => {
  const { isLoading } = useEditOperationFormData({
    editOperationId,
    onDisabled,
    onFormDataLoadComplete,
  })

  return <div>{isLoading}</div>
}

const createServer = () =>
  setupServer(
    mockGetFinancialOperationsByOperationId(
      successGetFinancialOperationsByOperationIdFullApiResponse,
    ),
  )

describe('useEditOperationFormData()', () => {
  const server = createServer()

  const renderUseEditOperationFormData = ({
    editOperationId,
    onDisabled = () => {},
    onFormDataLoadComplete = () => {},
  }: Partial<T.UseEditOperationFormDataParams>) =>
    renderHook(() =>
      useEditOperationFormData({
        editOperationId,
        onDisabled,
        onFormDataLoadComplete,
      }),
    )

  beforeAll(() => server.listen())
  afterAll(() => server.close())

  afterEach(() => {
    server.events.removeAllListeners('request:end')
    server.resetHandlers()
  })

  it('should NOT call API if "editOperationId=undefined"', async () => {
    const requestSpy = jest.fn()
    server.events.on('request:end', requestSpy)

    const { result } = renderUseEditOperationFormData({})

    await waitFor(() => expect(result.current.isLoading).toEqual(false))
    expect(requestSpy).toHaveBeenCalledTimes(0)
  })

  it('should call API', async () => {
    const requestSpy = jest.fn()
    server.events.on('request:end', requestSpy)

    renderUseEditOperationFormData({ editOperationId: 1 })

    await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))
  })

  it('should indicate loading progress', async () => {
    const requestSpy = jest.fn()
    server.events.on('request:end', requestSpy)

    const { result } = renderUseEditOperationFormData({ editOperationId: 1 })

    expect(result.current.isLoading).toEqual(true)

    await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

    await waitFor(() => expect(result.current.isLoading).toEqual(false))
  })

  it('should call "onDisabled" when loading data', async () => {
    const requestSpy = jest.fn()
    const mockOnDisabled = jest.fn()

    server.events.on('request:end', requestSpy)

    renderUseEditOperationFormData({
      onDisabled: mockOnDisabled,
      editOperationId: 1,
    })

    expect(mockOnDisabled).toHaveBeenCalledWith(true)

    await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

    await waitFor(() => expect(mockOnDisabled).toHaveBeenCalledWith(false))
  })

  describe('when call "onFormDataLoadComplete"', () => {
    it('should format data and mark expense as disabled if "isCapitalAssets"', async () => {
      server.use(
        mockGetFinancialOperationsByOperationId(
          successGetFinancialOperationsByOperationIdIsCapitalAssets,
        ),
      )

      const requestSpy = jest.fn()
      const mockOnFormDataLoadComplete = jest.fn()

      server.events.on('request:end', requestSpy)

      renderUseEditOperationFormData({
        onFormDataLoadComplete: mockOnFormDataLoadComplete,
        editOperationId: 1,
      })

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      await waitFor(() =>
        expect(mockOnFormDataLoadComplete).toHaveBeenCalledWith(
          {
            accountNumber: 'accountNumber',
            contractor: {
              alias: 'contractor',
              id: 1,
            },
            document: new File(
              [],
              successGetFinancialOperationsByOperationIdIsCapitalAssets.document!.fileName!,
            ),
            expenses: [
              {
                amount: '1000',
                budgetItem: {
                  id: 115,
                  isCapitalAssets: true,
                  isExpense: true,
                  isExternal: false,
                  name: 'Приход ОС по договору лизинга',
                  parentItemId: 109,
                  children: [],
                  level: 1,
                  rootId: 109,
                },
                id: 1,
                name: 'budgetItem',
                commissioningDate: DateHelper.toDate('2022-10'),
                periodOfUse: '20',
                disabled: true,
              },
            ],
            isPurchase: 'purchase',
            isWriteOff: 'writeOff',
            operationDate: new Date(
              successGetFinancialOperationsByOperationIdIsCapitalAssets.operationDate!,
            ),
            operationNumber: 'operationNumber',
            paymentPurpose: 'paymentPurpose',
            receiveDate: new Date(
              successGetFinancialOperationsByOperationIdIsCapitalAssets.receiveDate!,
            ),
          },
          successGetFinancialOperationsByOperationIdIsCapitalAssets.document,
        ),
      )
    })

    it('should NOT mark an expense as disabled if the expense is NOT "isCapitalAssets"', async () => {
      const requestSpy = jest.fn()
      const mockOnFormDataLoadComplete = jest.fn()

      server.events.on('request:end', requestSpy)

      renderUseEditOperationFormData({
        onFormDataLoadComplete: mockOnFormDataLoadComplete,
        editOperationId: 1,
      })

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      await waitFor(() =>
        expect(mockOnFormDataLoadComplete).toHaveBeenCalledWith(
          {
            accountNumber: 'accountNumber',
            contractor: {
              alias: 'contractor',
              id: 1,
            },
            document: new File(
              [],
              successGetFinancialOperationsByOperationIdFullApiResponse.document!.fileName!,
            ),
            expenses: [
              {
                amount: '1000',
                budgetItem: {
                  id: 41,
                  isCapitalAssets: false,
                  isExpense: true,
                  isExternal: false,
                  name: 'Приход ОС по договору лизинга',
                  parentItemId: 109,
                  children: [],
                  level: 1,
                  rootId: 109,
                },
                id: 1,
                name: 'budgetItem',
                commissioningDate: DateHelper.toDate('2022-10'),
                periodOfUse: '20',
                primeCost: '100',
                disabled: false,
              },
            ],
            isPurchase: 'purchase',
            isWriteOff: 'writeOff',
            operationDate: new Date(
              successGetFinancialOperationsByOperationIdFullApiResponse.operationDate!,
            ),
            operationNumber: 'operationNumber',
            paymentPurpose: 'paymentPurpose',
            receiveDate: new Date(
              successGetFinancialOperationsByOperationIdFullApiResponse.receiveDate!,
            ),
          },
          successGetFinancialOperationsByOperationIdFullApiResponse.document,
        ),
      )
    })

    it('should show error message', async () => {
      server.use(
        mockGetFinancialOperationsByOperationId(
          successGetFinancialOperationsByOperationIdFullApiResponse,
          500,
        ),
      )

      const requestSpy = jest.fn()
      server.events.on('request:end', requestSpy)

      const { getByText } = render(<MockComponent editOperationId={1} />)

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      await waitFor(() => {
        expect(getByText(ERROR_MESSAGE_500)).toBeInTheDocument()
      })
    })
  })
})
