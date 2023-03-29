import { yup } from '@app/core'

import { createSchema as createContractorInputSchema } from '../../components/FormContractorInput'
import { createSchema as createDateSchema } from '../../components/FormDateInput'
import { createSchema as createExpensesSchema } from '../../components/FormExpenses/validationSchema'
import { createSchema as createFileSchema } from '../../components/FormFileAttachmentInput'
import { FormFieldKey } from './enums'
import { ERROR_MESSAGE_EMPTY_DATE_DOCUMENT_FIELD } from './messages/errors'

export const schema = yup.object().shape({
  ...createContractorInputSchema(FormFieldKey.CONTRACTOR),
  ...createExpensesSchema(FormFieldKey.EXPENSES),
  ...createDateSchema(
    FormFieldKey.DOCUMENT_DATE,
    ERROR_MESSAGE_EMPTY_DATE_DOCUMENT_FIELD,
  ),
  ...createFileSchema(FormFieldKey.DOCUMENT),
})
