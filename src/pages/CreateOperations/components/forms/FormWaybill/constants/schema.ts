import { BaseSchema } from 'yup'

import { yup } from '@app/core'

import { Nullable } from '@common/types/Nullable'

import { DateHelper, invalidDateValidation } from '@helpers'

import {
  ERROR_MESSAGE_EMPTY_DELIVERY_DATE_FIELD,
  ERROR_MESSAGE_EMPTY_EXPENSE_ID_FIELD,
  ERROR_MESSAGE_INVALID_DATE,
} from '../../../../constants/messages/error'
import { createSchema as createContractorInputSchema } from '../../components/FormContractorInput'
import { createSchema as createDateSchema } from '../../components/FormDateInput'
import { createSchema as createExpensesSchema } from '../../components/FormExpenses/validationSchema'
import { createSchema as createFileSchema } from '../../components/FormFileAttachmentInput'
import { FormFieldKey } from './enums'
import {
  ERROR_MESSAGE_EMPTY_WAYBILL_DATE_FIELD,
  ERROR_MESSAGE_EMPTY_WAYBILL_NUMBER_FIELD,
  ERROR_MESSAGE_WAYBILL_DATE_AFTER_DELIVERY,
} from './messages/errors'

export const schema = yup.object().shape({
  ...createContractorInputSchema(FormFieldKey.CONTRACTOR),
  ...createExpensesSchema(
    FormFieldKey.EXPENSES,
    ERROR_MESSAGE_EMPTY_EXPENSE_ID_FIELD,
    {
      articleSchema: true,
      sumSchema: true,
      denominationSchema: { shouldValidateUniqueness: true },
      periodOfUseSchema: true,
      commissioningSchema: true,
      primeCostSchema: true,
    },
  ),
  [FormFieldKey.WAYBILL_NUMBER]: yup
    .string()
    .required(ERROR_MESSAGE_EMPTY_WAYBILL_NUMBER_FIELD),
  [FormFieldKey.WAYBILL_DATE]: yup
    .mixed()
    .test(
      invalidDateValidation(
        FormFieldKey.WAYBILL_DATE,
        ERROR_MESSAGE_EMPTY_WAYBILL_DATE_FIELD,
        ERROR_MESSAGE_INVALID_DATE,
      ),
    )
    .when(
      FormFieldKey.DELIVERY_DATE,
      (deliveryDate: Nullable<Date>, baseSchema: BaseSchema) =>
        deliveryDate
          ? baseSchema.test(
              'date_before',
              ERROR_MESSAGE_WAYBILL_DATE_AFTER_DELIVERY,
              (curDate: Nullable<Date>) =>
                !curDate ||
                !deliveryDate ||
                DateHelper.isSameOrBeforeDay(curDate, deliveryDate),
            )
          : baseSchema
              .required(ERROR_MESSAGE_EMPTY_WAYBILL_DATE_FIELD)
              .typeError(ERROR_MESSAGE_EMPTY_WAYBILL_DATE_FIELD),
    ),
  ...createDateSchema(
    FormFieldKey.DELIVERY_DATE,
    ERROR_MESSAGE_EMPTY_DELIVERY_DATE_FIELD,
  ),
  ...createFileSchema(FormFieldKey.DOCUMENT),
})
