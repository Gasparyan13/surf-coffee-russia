import { useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { ServerError } from '@common/types/Errors'

import { DateHelper } from '@helpers'

import { useLazyGetFinancialOperationsByOperationIdQuery } from '@rtkApi/modules/__generated__/financial'

import {
  EPurchaseSale,
  EWriteOffReceipt,
} from '../../components/forms/components/FormToggleButtonGroup/enums'
import { getServerErrorMessage } from '../../utils/getters'
import * as T from './useEditOperationFormData.types'

export const useEditOperationFormData = ({
  editOperationId,
  onFormDataLoadComplete,
  onDisabled,
}: T.UseEditOperationFormDataParams) => {
  const [isLoading, setIsLoading] = useState(true)

  const [apiGetFinancialOperationsByOperationId] =
    useLazyGetFinancialOperationsByOperationIdQuery()

  useLayoutEffect(() => {
    const handleLoadFormData = async () => {
      try {
        if (!editOperationId) {
          setIsLoading(false)
          return
        }

        setIsLoading(true)
        onDisabled(true)

        const formData = await apiGetFinancialOperationsByOperationId({
          operationId: editOperationId,
        }).unwrap()

        const {
          expenses,
          contractor,
          isIncome,
          operationDate,
          receiveDate,
          document,
          operationNumber,
          accountNumber,
          paymentPurpose,
        } = formData
        onFormDataLoadComplete(
          {
            expenses: expenses
              ? expenses?.map(
                  ({
                    money,
                    capitalAsset,
                    name,
                    primeCost,
                    budgetItem,
                    ...rest
                  }) => ({
                    ...rest,
                    budgetItem: budgetItem!,
                    name: `${name}`,
                    amount: `${money}`,
                    periodOfUse: capitalAsset?.periodOfUse
                      ? `${capitalAsset?.periodOfUse}`
                      : undefined,
                    commissioningDate: capitalAsset?.startDate
                      ? DateHelper.toDate(capitalAsset?.startDate)
                      : null,
                    primeCost: primeCost ? `${primeCost}` : undefined,
                    disabled: budgetItem?.isCapitalAssets,
                  }),
                )
              : [],
            contractor: contractor!,
            operationNumber: operationNumber!,
            accountNumber: accountNumber!,
            paymentPurpose: paymentPurpose!,
            isPurchase: isIncome ? EPurchaseSale.Sale : EPurchaseSale.Purchase,
            isWriteOff: isIncome
              ? EWriteOffReceipt.Receipt
              : EWriteOffReceipt.WriteOff,
            operationDate: operationDate
              ? DateHelper.toDate(operationDate)
              : null,
            receiveDate: receiveDate ? DateHelper.toDate(receiveDate) : null,
            document: document
              ? new File([], `${document?.fileName}`, {
                  // create empty file with allowed type
                  type: 'application/pdf',
                })
              : null,
          },
          document,
        )

        setIsLoading(false)
        onDisabled(false)
      } catch (e) {
        toast.error(getServerErrorMessage(e as ServerError))
      }
    }

    handleLoadFormData()
  }, [editOperationId])

  return { isLoading }
}
