import { yup } from '@app/core'

import { CurrencyRangeValue } from '../../CurrencyRangeInput/CurrencyRangeField.types'
import {
  ERROR_MESSAGE_INVALID_RANGE,
  ERROR_MESSAGE_INVALID_VALUE,
} from './messages/errors'

export const schema = yup.object().shape({
  operationType: yup.string().nullable().typeError(ERROR_MESSAGE_INVALID_VALUE),
  operationKind: yup.string().nullable().typeError(ERROR_MESSAGE_INVALID_VALUE),
  contractor: yup.object().nullable().typeError(ERROR_MESSAGE_INVALID_VALUE),
  article: yup.object().nullable().typeError(ERROR_MESSAGE_INVALID_VALUE),
  amount: yup.mixed().test({
    name: 'isValidCurrencyRangeValue',
    message: ERROR_MESSAGE_INVALID_RANGE,
    test(this: any, value: CurrencyRangeValue) {
      if (value.min && value.max) {
        return +value.max >= +value.min
      }

      return true
    },
  }),
})
