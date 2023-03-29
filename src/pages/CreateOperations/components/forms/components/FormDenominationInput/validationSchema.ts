import axios from 'axios'

import { yup } from '@app/core'

import { LS_ACCESS_TOKEN } from '@rtkApi/core/constants'

import { ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD } from '../../../../constants/messages/error'
import { ERROR_MESSAGE_UNIQUE_NAME } from '../FormExpenseItem/constants/error'
import { ExpensesItemFieldKey } from '../FormExpenses'
import { EPurchaseSale } from '../FormToggleButtonGroup/enums'
import * as T from './FormDenominationInput.types'

export const createSchema = ({
  name = ExpensesItemFieldKey.NAME,
  errorMessage = ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD,
  uniqueErrorMessage = ERROR_MESSAGE_UNIQUE_NAME,
}: T.CreateValidationArg) => ({
  [name]: yup.mixed().test({
    name: 'isUniqueDenomination',
    message: uniqueErrorMessage,
    test(this: any, value: string) {
      const { from } = this
      const { isPurchase } = from[from.length - 1].value
      const { budgetItem, disabled } = from[0].value

      // common string validation
      const schema = yup.object().shape({
        [name]: yup.string().required(errorMessage),
      })

      if (!schema.isValidSync({ [name]: value }))
        return this.createError({
          message: errorMessage,
          path: this.path,
        })

      if (
        budgetItem?.isCapitalAssets &&
        isPurchase === EPurchaseSale.Purchase &&
        !disabled
      ) {
        if (!value) return schema.isValidSync({ [name]: value })
        return new Promise((resolve) => {
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(LS_ACCESS_TOKEN)}`,
            },
          }
          axios
            .head(
              `${$BACK_DOMAIN$}/financial/used_capital_assets/${value}`,
              config,
            )
            .then(() => {
              // exists
              return resolve(false)
            })
            .catch(() => {
              // doesn't exist
              return resolve(true)
            })
        })
      }

      return true
    },
  }),
})
