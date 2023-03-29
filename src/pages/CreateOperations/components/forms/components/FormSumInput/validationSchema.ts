import { createSumValidationSchema } from '@helpers/yup'

import { ERROR_MESSAGE_EMPTY_SUM_FIELD } from '../../../../constants/messages/error'
import { ExpensesItemFieldKey } from '../FormExpenses'

export const createSchema = (
  name: string = ExpensesItemFieldKey.AMOUNT,
  errorMessage = ERROR_MESSAGE_EMPTY_SUM_FIELD,
) => createSumValidationSchema(name, errorMessage)
