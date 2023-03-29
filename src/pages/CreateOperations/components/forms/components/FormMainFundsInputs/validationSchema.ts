import { yup } from '@app/core'

import { ERROR_MESSAGE_EMPTY_COMMISSIONING } from '../../FormWaybill/constants/messages/errors'
import { ExpensesItemFieldKey } from '../FormExpenses'
import { EPurchaseSale } from '../FormToggleButtonGroup/enums'

export const createSchema = (
  name = ExpensesItemFieldKey.COMMISSIONING_DATE,
  errorMessage = ERROR_MESSAGE_EMPTY_COMMISSIONING,
) => ({
  [name]: yup.mixed().test({
    name: 'isMainFunds',
    message: errorMessage,
    test(this: any, value: Date) {
      const { from } = this
      const { isPurchase } = from[from.length - 1].value
      const { budgetItem } = from[0].value
      if (
        budgetItem?.isCapitalAssets &&
        isPurchase === EPurchaseSale.Purchase
      ) {
        return !!value
      }

      return true
    },
  }),
})
