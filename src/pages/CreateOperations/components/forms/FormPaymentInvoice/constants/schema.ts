import { BaseSchema } from 'yup'

import { yup } from '@app/core'

import { Nullable } from '@common/types/Nullable'

import { DateHelper, invalidDateValidation } from '@helpers'

import { createSchema as createContractorInputSchema } from '@pages/CreateOperations/components/forms/components/FormContractorInput'
import { createSchema as createDateSchema } from '@pages/CreateOperations/components/forms/components/FormDateInput'
import { createSchema as createExpensesSchema } from '@pages/CreateOperations/components/forms/components/FormExpenses'
import { createSchema as createFileSchema } from '@pages/CreateOperations/components/forms/components/FormFileAttachmentInput'
import {
  ERROR_MESSAGE_EMPTY_EXPENSE_ID_FIELD,
  ERROR_MESSAGE_INVALID_DATE,
} from '@pages/CreateOperations/constants/messages/error'

import { FormFieldKey } from './enum'
import {
  ERROR_MESSAGE_EMPTY_INVOICE_DATE_FIELD,
  ERROR_MESSAGE_EMPTY_INVOICE_NUMBER_FIELD,
  ERROR_MESSAGE_EMPTY_INVOICE_PAYMENT_DATE,
  ERROR_MESSAGE_INVOICE_DATE_AFTER_PAYMENT,
} from './messages/errors'

export const schema = yup.object().shape({
  ...createContractorInputSchema(FormFieldKey.CONTRACTOR),
  ...createExpensesSchema(
    FormFieldKey.EXPENSES,
    ERROR_MESSAGE_EMPTY_EXPENSE_ID_FIELD,
    {
      primeCostSchema: true,
    },
  ),
  [FormFieldKey.INVOICE_NUMBER]: yup
    .string()
    .required(ERROR_MESSAGE_EMPTY_INVOICE_NUMBER_FIELD)
    .typeError(ERROR_MESSAGE_EMPTY_INVOICE_NUMBER_FIELD),
  ...createDateSchema(
    FormFieldKey.INVOICE_DATE,
    ERROR_MESSAGE_EMPTY_INVOICE_DATE_FIELD,
  ),
  [FormFieldKey.PAYMENT_DATE]: yup
    .mixed()
    .test(
      invalidDateValidation(
        FormFieldKey.PAYMENT_DATE,
        ERROR_MESSAGE_EMPTY_INVOICE_PAYMENT_DATE,
        ERROR_MESSAGE_INVALID_DATE,
      ),
    )
    .when(
      FormFieldKey.INVOICE_DATE,
      (invoiceDate: Nullable<Date>, baseSchema: BaseSchema) =>
        invoiceDate
          ? baseSchema.test(
              'date_before',
              ERROR_MESSAGE_INVOICE_DATE_AFTER_PAYMENT,
              (curDate: Nullable<Date>) =>
                !curDate ||
                !invoiceDate ||
                DateHelper.isSameOrAftereDay(curDate, invoiceDate),
            )
          : baseSchema
              .required(ERROR_MESSAGE_EMPTY_INVOICE_PAYMENT_DATE)
              .typeError(ERROR_MESSAGE_EMPTY_INVOICE_PAYMENT_DATE),
    ),
  ...createFileSchema(FormFieldKey.DOCUMENT),
})
