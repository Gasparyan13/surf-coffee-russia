import { yup } from '../../../../../../app/core'
import { invalidDateValidation } from '../../../../../../common/helpers/yup'
import { ERROR_MESSAGE_INVALID_DATE } from '../../../../constants/messages/error'

export const createSchema = (
  name: string,
  errorEmptyMessage: string,
  errorInvalidMessage = ERROR_MESSAGE_INVALID_DATE,
) => ({
  [name]: yup
    .mixed()
    .test(invalidDateValidation(name, errorEmptyMessage, errorInvalidMessage)),
})
