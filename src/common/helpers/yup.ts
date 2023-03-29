import { TestContext } from 'yup'
import { AnyObject } from 'yup/lib/types'

import { yup } from '@app/core'

export const createSumValidationSchema = (
  name: string,
  errorMessage: string,
) => ({
  [name]: yup
    .string()
    .required(errorMessage)
    .test(
      'is_sum_valid',
      errorMessage,
      (value) => !!value && +value.replace(',', '.') > 0,
    )
    .typeError(errorMessage),
})

export const invalidDateValidation = (
  name: string,
  errorEmptyMessage: string,
  errorInvalidMessage: string,
) => ({
  name: 'date validation check',
  test(this: TestContext<AnyObject>, value: Date) {
    if (!value) {
      return this.createError({
        message: errorEmptyMessage,
        path: name,
      })
    }
    if (String(value) === 'Invalid Date') {
      return this.createError({
        message: errorInvalidMessage,
        path: name,
      })
    }
    return true
  },
})
