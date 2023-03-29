import { yup } from '@app/core'

import { createSchema as createArticleSchema } from '../FormArticleSelect'
import { createSchema as createDenominationSchema } from '../FormDenominationInput'
import { CreateValidationArg as CreateValidationDenominationArg } from '../FormDenominationInput/FormDenominationInput.types'
import { createSchema as createCommissioningSchema } from '../FormMainFundsInputs'
import { createSchema as createPeriodOfUseSchema } from '../FormPeriodOfUseInput'
import { createSchema as createPrimeCostSchema } from '../FormPrimeCostInput'
import { createSchema as createSumSchema } from '../FormSumInput'

type ExpensesValidationConfig = {
  articleSchema?: boolean
  sumSchema?: boolean
  denominationSchema?: CreateValidationDenominationArg | false
  periodOfUseSchema?: boolean
  commissioningSchema?: boolean
  primeCostSchema?: boolean
}

const defaultConfig: ExpensesValidationConfig = {
  articleSchema: true,
  sumSchema: true,
  denominationSchema: {},
  periodOfUseSchema: false,
  commissioningSchema: false,
  primeCostSchema: false,
}

export const createSchema = (
  name: string,
  errorMessage?: string,
  config?: ExpensesValidationConfig,
) => {
  const finishConfig = {
    ...defaultConfig,
    ...config,
  }

  return {
    [name]: yup.array().of(
      yup
        .object()
        .shape({
          ...(finishConfig?.articleSchema ? createArticleSchema() : {}),
          ...(finishConfig?.sumSchema ? createSumSchema() : {}),
          ...(finishConfig?.denominationSchema
            ? createDenominationSchema(finishConfig?.denominationSchema)
            : {}),
          ...(finishConfig?.primeCostSchema ? createPrimeCostSchema() : {}),
          ...(finishConfig?.periodOfUseSchema ? createPeriodOfUseSchema() : {}),
          ...(finishConfig?.commissioningSchema
            ? createCommissioningSchema()
            : {}),
        })
        .required(errorMessage),
    ),
  }
}
