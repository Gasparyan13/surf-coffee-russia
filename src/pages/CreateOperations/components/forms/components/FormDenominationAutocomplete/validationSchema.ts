import { yup } from '@app/core'

import { ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD } from '../../../../constants/messages/error'
import { ExpensesItemFieldKey } from '../FormExpenses'

export const createSchema = (
  name = ExpensesItemFieldKey.NAME,
  errorMessage = ERROR_MESSAGE_EMPTY_DENOMINATION_FIELD,
) => ({
  [name]: yup.string().required(errorMessage),
})
