import React from 'react'

import { ERROR_MESSAGE_500 } from '@common/constants/messages/responseError'

import { successGetFinancialPlannedOperationsById } from '@testEnv/mocks/api/financial'
import { setupServer } from '@testEnv/server'
import { mockGetFinancialPlannedOperationsById } from '@testEnv/server/handlers/financial'
import { render, renderHook, waitFor } from '@testEnv/utils'

import { useEditPlannedOperationFormData } from './useEditPlannedOperationFormData'
import * as T from './useEditPlannedOperationFormData.types'

const MockComponent: React.FC<Partial<T.UseEditOperationFormDataParams>> = ({
  editOperationId,
  onDisabled = () => {},
  onFormDataLoadComplete = () => {},
}) => {
  const { isLoading } = useEditPlannedOperationFormData({
    editOperationId,
    onDisabled,
    onFormDataLoadComplete,
  })

  return <div>{isLoading}</div>
}

const createServer = () =>
  setupServer(
    mockGetFinancialPlannedOperationsById(
      successGetFinancialPlannedOperationsById,
    ),
  )

describe('useEditPlannedOperationFormData()', () => {
  const server = createServer()

  const renderUseEditOperationFormData = ({
    editOperationId,
    onDisabled = () => {},
    onFormDataLoadComplete = () => {},
  }: Partial<T.UseEditOperationFormDataParams>) =>
    renderHook(() =>
      useEditPlannedOperationFormData({
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
    it('should return formatted data', async () => {
      const requestSpy = jest.fn()
      const mockOnFormDataLoadComplete = jest.fn()

      server.events.on('request:end', requestSpy)

      renderUseEditOperationFormData({
        onFormDataLoadComplete: mockOnFormDataLoadComplete,
        editOperationId: 1,
      })

      await waitFor(() => expect(requestSpy).toHaveBeenCalledTimes(1))

      await waitFor(() =>
        expect(mockOnFormDataLoadComplete).toHaveBeenCalledWith({
          amount: '1200',
          budgetItem: {
            id: 3,
            isCapitalAssets: false,
            name: 'Прикассовая зона',
            parentItemId: 1,
          },
          contractor: { alias: 'Новое физ лицо', id: 476 },
          expensesId: 3,
          isService: false,
          isWriteOff: 'writeOff',
          name: 'кока кола',
          paymentDate: new Date('2022-10-26T00:00:00.000Z'),
          paymentType: 'cashless',
          receiveDate: new Date('2022-10-26T00:00:00.000Z'),
        }),
      )
    })

    it('should show error message', async () => {
      server.use(
        mockGetFinancialPlannedOperationsById(
          successGetFinancialPlannedOperationsById,
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
