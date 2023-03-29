import { yup } from '@app/core'

import { ERROR_MESSAGE_EMPTY_CONTRACTOR_FIELD } from '../../../../constants/messages/error'

export const createSchema = (
  name: string,
  errorMessage = ERROR_MESSAGE_EMPTY_CONTRACTOR_FIELD,
) => ({
  [name]: yup
    .object()
    .shape({
      id: yup.string().required(errorMessage).typeError(errorMessage),
    })
    .typeError(errorMessage),
})
