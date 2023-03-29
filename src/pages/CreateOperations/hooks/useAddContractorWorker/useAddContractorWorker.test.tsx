import { renderHook } from '@testEnv/utils'

import { EPurchaseSale } from '../../components/forms/components/FormToggleButtonGroup/enums'
import { useAddContractorWorker } from './useAddContractorWorker'
import * as T from './useAddContractorWorker.types'

const mockResetField = jest.fn()

describe('useAddContractorWorker()', () => {
  const renderUseAddContractorWorkers = ({
    budgetItemId,
    isPurchaseOrWriteOff,
    resetField,
  }: T.Props) =>
    renderHook(() =>
      useAddContractorWorker({
        budgetItemId,
        isPurchaseOrWriteOff,
        resetField,
      }),
    )

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should return false if budgetItemId card is undefined', () => {
    const { result } = renderUseAddContractorWorkers({
      budgetItemId: undefined,
      isPurchaseOrWriteOff: EPurchaseSale.Purchase,
      resetField: mockResetField,
    })

    expect(result.current).toBeFalsy()
  })

  it('should return false if isPurchaseOrWriteOff is not purchase', () => {
    const { result } = renderUseAddContractorWorkers({
      budgetItemId: 43,
      isPurchaseOrWriteOff: EPurchaseSale.Sale,
      resetField: mockResetField,
    })

    expect(result.current).toBeFalsy()
  })

  it('should return false if budgetItem is not payroll id', () => {
    const { result } = renderUseAddContractorWorkers({
      budgetItemId: 41,
      isPurchaseOrWriteOff: EPurchaseSale.Purchase,
      resetField: mockResetField,
    })

    expect(result.current).toBeFalsy()
  })

  it('should return true if budgetItem is payroll id', () => {
    const { result } = renderUseAddContractorWorkers({
      budgetItemId: 43,
      isPurchaseOrWriteOff: EPurchaseSale.Purchase,
      resetField: mockResetField,
    })

    expect(result.current).toBeTruthy()
  })

  describe('when calling resetField', () => {
    it('should call resetField if budgetItem is payroll id', () => {
      renderUseAddContractorWorkers({
        budgetItemId: 43,
        isPurchaseOrWriteOff: EPurchaseSale.Purchase,
        resetField: mockResetField,
      })

      expect(mockResetField).toBeCalledTimes(1)
    })

    it('should not call resetField if budgetItem is not payroll id', () => {
      renderUseAddContractorWorkers({
        budgetItemId: 41,
        isPurchaseOrWriteOff: EPurchaseSale.Purchase,
        resetField: mockResetField,
      })

      expect(mockResetField).toBeCalledTimes(0)
    })
  })
})
