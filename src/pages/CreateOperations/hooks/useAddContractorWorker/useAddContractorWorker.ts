import { useLayoutEffect, useRef, useState } from 'react'

import { Nullable } from '@common/types/Nullable'

import {
  EPurchaseSale,
  EWriteOffReceipt,
} from '../../components/forms/components/FormToggleButtonGroup/enums'
import { getIsIdPayrollBudgetItem } from '../../utils/getters'
import * as T from './useAddContractorWorker.types'

export const useAddContractorWorker = ({
  budgetItemId,
  isPurchaseOrWriteOff,
  resetField,
}: T.Props): boolean => {
  const [isAddContractorWorker, setIsAddContractorWorker] = useState(false)

  const idPayrollBudgetItem = useRef<Nullable<number>>(null)

  useLayoutEffect(() => {
    const isPurchaseOrWriteOffValue =
      isPurchaseOrWriteOff === EPurchaseSale.Purchase ||
      isPurchaseOrWriteOff === EWriteOffReceipt.WriteOff

    const isIdPayrollBudgetItem =
      !!budgetItemId && getIsIdPayrollBudgetItem(budgetItemId)

    const isAddContractorWorkerValue =
      isPurchaseOrWriteOffValue && isIdPayrollBudgetItem

    if (isIdPayrollBudgetItem || idPayrollBudgetItem.current) {
      resetField()
      idPayrollBudgetItem.current = null
    }

    if (isAddContractorWorkerValue) {
      idPayrollBudgetItem.current = budgetItemId
    }

    setIsAddContractorWorker(isAddContractorWorkerValue)
  }, [isPurchaseOrWriteOff, budgetItemId])

  return isAddContractorWorker
}
