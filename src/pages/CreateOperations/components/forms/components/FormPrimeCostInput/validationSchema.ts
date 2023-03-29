import { yup } from '@app/core'

import { createSumValidationSchema } from '@helpers/yup'

import { ERROR_MESSAGE_EMPTY_PRIME_COST_FIELD } from '../../../../constants/messages/error'
import { ExpensesItemFieldKey } from '../FormExpenses'
import { EPurchaseSale } from '../FormToggleButtonGroup/enums'

export const createSchema = (
  name = ExpensesItemFieldKey.PRIME_COST,
  errorMessage = ERROR_MESSAGE_EMPTY_PRIME_COST_FIELD,
) => ({
  [name]: yup.mixed().test({
    name: 'isPrimeCost',
    message: errorMessage,
    test(this: any, value: string) {
      const { from } = this
      const { isPurchase } = from[from.length - 1].value
      const { budgetItem } = from[0].value

      if (!budgetItem?.isCapitalAssets && isPurchase === EPurchaseSale.Sale) {
        const schema = yup.object().shape({
          ...createSumValidationSchema(name, errorMessage),
        })

        return schema.isValidSync({ [name]: value })
      }

      return true
    },
  }),
})
