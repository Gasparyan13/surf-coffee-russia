import { useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { ServerError } from '@common/types/Errors'

import { DateHelper } from '@helpers'

import { useLazyGetFinancialPlannedOperationsByIdQuery } from '@rtkApi/modules/__generated__/financial'

import { getServerErrorMessage } from '../../../../../utils/getters'
import { EWriteOffReceipt } from '../../../components/FormToggleButtonGroup/enums'
import { PaymentType } from '../../constants/enums'
import * as T from './useEditPlannedOperationFormData.types'

export const useEditPlannedOperationFormData = ({
  editOperationId,
  onFormDataLoadComplete,
  onDisabled,
}: T.UseEditOperationFormDataParams) => {
  const [isLoading, setIsLoading] = useState(true)

  const [apiGetFinancialPlannedOperationsById] =
    useLazyGetFinancialPlannedOperationsByIdQuery()

  useLayoutEffect(() => {
    const handleLoadFormData = async () => {
      try {
        if (!editOperationId) {
          setIsLoading(false)
          return
        }

        setIsLoading(true)
        onDisabled(true)

        const formData = await apiGetFinancialPlannedOperationsById({
          id: editOperationId,
        }).unwrap()

        const {
          contractor,
          isWriteOff,
          isCash,
          expense,
          dateOfPayment,
          dateOfReceiving,
          isService,
        } = formData

        onFormDataLoadComplete({
          isWriteOff: isWriteOff
            ? EWriteOffReceipt.WriteOff
            : EWriteOffReceipt.Receipt,
          isService: !!isService,
          contractor: contractor!,
          paymentDate: dateOfPayment ? DateHelper.toDate(dateOfPayment) : null,
          receiveDate: dateOfReceiving
            ? DateHelper.toDate(dateOfReceiving)
            : null,
          expensesId: expense!.id!,
          budgetItem: expense!.budgetItem!,
          amount: `${expense?.money}`,
          name: expense?.name ? `${expense?.name}` : '',
          paymentType: isCash ? PaymentType.Cash : PaymentType.Cashless,
        })

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
