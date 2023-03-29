import { yup } from '@app/core'

import { ERROR_MESSAGE_EMPTY_CONTRACTOR_FIELD } from '../../../../constants/messages/error'

export const createSchema = (
  name: string,
  errorMessage = ERROR_MESSAGE_EMPTY_CONTRACTOR_FIELD,
) => ({
  [name]: yup.mixed().required(errorMessage).typeError(errorMessage),
})
