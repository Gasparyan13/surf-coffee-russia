import { yup } from '@app/core'

import {
  ERROR_MESSAGE_EMPTY_DELIVERY_DATE_FIELD,
  ERROR_MESSAGE_EMPTY_EXPENSE_ID_FIELD,
} from '../../../../constants/messages/error'
import { createSchema as createContractorInputSchema } from '../../components/FormContractorInput'
import { createSchema as createContractorWorkerAutocompleteSchema } from '../../components/FormContractorWorkerAutocomplete'
import { createSchema as createDateSchema } from '../../components/FormDateInput'
import { createSchema as createExpensesSchema } from '../../components/FormExpenses/validationSchema'
import { createSchema as createFileSchema } from '../../components/FormFileAttachmentInput'
import { FormFieldKey } from './enums'
import {
  ERROR_MESSAGE_EMPTY_ACT_DATE_FIELD,
  ERROR_MESSAGE_EMPTY_ACT_NUMBER_FIELD,
} from './messages/errors'

export const schema = yup.object().shape({
  ...createContractorInputSchema(FormFieldKey.CONTRACTOR),
  ...createContractorWorkerAutocompleteSchema(FormFieldKey.CONTRACTOR),
  ...createExpensesSchema(
    FormFieldKey.EXPENSES,
    ERROR_MESSAGE_EMPTY_EXPENSE_ID_FIELD,
    {
      primeCostSchema: true,
    },
  ),
  [FormFieldKey.ACT_NUMBER]: yup
    .string()
    .required(ERROR_MESSAGE_EMPTY_ACT_NUMBER_FIELD)
    .typeError(ERROR_MESSAGE_EMPTY_ACT_NUMBER_FIELD),
  ...createDateSchema(
    FormFieldKey.ACT_DATE,
    ERROR_MESSAGE_EMPTY_ACT_DATE_FIELD,
  ),
  ...createDateSchema(
    FormFieldKey.DELIVERY_DATE,
    ERROR_MESSAGE_EMPTY_DELIVERY_DATE_FIELD,
  ),
  ...createFileSchema(FormFieldKey.DOCUMENT),
})
