import { yup } from '@app/core'

import { createSchema as createArticleSchema } from '../../components/FormArticleSelect'
import { createSchema as createContractorInputSchema } from '../../components/FormContractorInput'
import { createSchema as createContractorWorkerAutocompleteSchema } from '../../components/FormContractorWorkerAutocomplete'
import { createSchema as createDateSchema } from '../../components/FormDateInput'
import { createSchema as createRadioButtonGroupSchema } from '../../components/FormRadioButtonGroup'
import { createSchema as createSumSchema } from '../../components/FormSumInput'
import { FormFieldKey } from './enums'
import {
  ERROR_MESSAGE_EMPTY_ACCRUAL_DATE,
  ERROR_MESSAGE_EMPTY_PAYMENT_DATE,
  ERROR_MESSAGE_EMPTY_PAYMENT_TYPE,
} from './messages/errors'

export const schema = yup.object().shape({
  ...createContractorInputSchema(FormFieldKey.CONTRACTOR),
  ...createContractorWorkerAutocompleteSchema(FormFieldKey.CONTRACTOR),
  ...createDateSchema(
    FormFieldKey.PAYMENT_DATE,
    ERROR_MESSAGE_EMPTY_PAYMENT_DATE,
  ),
  ...createDateSchema(
    FormFieldKey.ACCRUAL_DATE,
    ERROR_MESSAGE_EMPTY_ACCRUAL_DATE,
  ),
  ...createArticleSchema(FormFieldKey.BUDGET_ITEM),
  ...createSumSchema(FormFieldKey.AMOUNT),
  ...createRadioButtonGroupSchema(
    FormFieldKey.PAYMENT_TYPE,
    ERROR_MESSAGE_EMPTY_PAYMENT_TYPE,
  ),
})
