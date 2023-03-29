import { useCallback, useLayoutEffect } from 'react'
import { toast } from 'react-toastify'

import { ERROR_MESSAGE_500 } from '@constants'

import {
  BudgetItemViewDto,
  GetPrepaymentBudgetItemsApiArg,
  useLazyGetPrepaymentBudgetItemsQuery,
} from '@rtkApi/modules/__generated__/prepayment'

export const useFetchBudgetItems = ({
  isPurchase,
  operationType,
}: GetPrepaymentBudgetItemsApiArg): [
  budgetItems: BudgetItemViewDto[] | undefined,
  isLoading: boolean,
] => {
  const [
    apiGetPrepaymentBudgetItems,
    { data: budgetItems, isLoading: isLoadingBudgetItems },
  ] = useLazyGetPrepaymentBudgetItemsQuery()

  const fetchBudgetItems = useCallback(() => {
    try {
      let apiArgs: GetPrepaymentBudgetItemsApiArg = {}

      if (operationType) apiArgs = { isPurchase, operationType }

      apiGetPrepaymentBudgetItems(apiArgs).unwrap()
    } catch (error) {
      toast.error(ERROR_MESSAGE_500)
    }
  }, [apiGetPrepaymentBudgetItems, isPurchase, operationType])

  useLayoutEffect(() => {
    fetchBudgetItems()
  }, [fetchBudgetItems])

  return [budgetItems, isLoadingBudgetItems]
}
