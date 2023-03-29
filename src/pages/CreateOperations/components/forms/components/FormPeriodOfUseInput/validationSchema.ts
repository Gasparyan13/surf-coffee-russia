import { yup } from '@app/core'

import { periodOfUseRegExp } from '@constants'

import {
  ERROR_MESSAGE_EMPTY_PERIOD_OF_USE,
  ERROR_MESSAGE_FROM_12_TO_36,
} from '../../FormWaybill/constants/messages/errors'
import { ExpensesItemFieldKey } from '../FormExpenses'
import { EPurchaseSale } from '../FormToggleButtonGroup/enums'

export const createSchema = (
  name = ExpensesItemFieldKey.PERIOD_OF_USE,
  errorMessage = ERROR_MESSAGE_EMPTY_PERIOD_OF_USE,
) => ({
  [name]: yup.mixed().test({
    name: 'isMainFundsPeriodOfUse',
    message: errorMessage,
    test(this: any, value: string) {
      const { from } = this
      const { isPurchase } = from[from.length - 1].value
      const { budgetItem } = from[0].value

      if (
        budgetItem?.isCapitalAssets &&
        isPurchase === EPurchaseSale.Purchase
      ) {
        if (value && !value.match(periodOfUseRegExp)) {
          return this.createError({
            message: ERROR_MESSAGE_FROM_12_TO_36,
            path: this.path,
          })
        }
        return !!value
      }

      return true
    },
  }),
})
