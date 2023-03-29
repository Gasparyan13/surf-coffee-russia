import { yup } from '@app/core'

import { ERROR_MESSAGE_EMPTY_ARTICLE_FIELD } from '../../../../constants/messages/error'
import { ExpensesItemFieldKey } from '../FormExpenses'

export const createSchema = (
  name: string = ExpensesItemFieldKey.BUDGET_ITEM,
  errorMessage = ERROR_MESSAGE_EMPTY_ARTICLE_FIELD,
) => ({
  [name]: yup.mixed().required(errorMessage).typeError(errorMessage),
})
