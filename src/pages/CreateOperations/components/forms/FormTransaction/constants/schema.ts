import { yup } from '@app/core'

import {
  ERROR_MESSAGE_EMPTY_EXPENSE_ID_FIELD,
  ERROR_MESSAGE_EMPTY_PAYMENT_PURPOSE_FIELD,
} from '../../../../constants/messages/error'
import { createSchema as createContractorInputSchema } from '../../components/FormContractorInput'
import { createSchema as createContractorWorkerAutocompleteSchema } from '../../components/FormContractorWorkerAutocomplete'
import { createSchema as createDateSchema } from '../../components/FormDateInput'
import { createSchema as createExpenseItemsSchema } from '../../components/FormExpenses'
import { FormFieldKey } from './enums'
import { ERROR_MESSAGE_EMPTY_TRANSACTION_DATE_FIELD } from './messages/errors'

export const schema = yup.object().shape({
  ...createContractorInputSchema(FormFieldKey.CONTRACTOR),
  ...createContractorWorkerAutocompleteSchema(FormFieldKey.CONTRACTOR),
  ...createDateSchema(
    FormFieldKey.TRANSACTION_DATE,
    ERROR_MESSAGE_EMPTY_TRANSACTION_DATE_FIELD,
  ),
  [FormFieldKey.PAYMENT_PURPOSE]: yup
    .string()
    .required(ERROR_MESSAGE_EMPTY_PAYMENT_PURPOSE_FIELD),
  ...createExpenseItemsSchema(
    FormFieldKey.EXPENSES,
    ERROR_MESSAGE_EMPTY_EXPENSE_ID_FIELD,
    {
      articleSchema: true,
      sumSchema: true,
      denominationSchema: false,
    },
  ),
})
