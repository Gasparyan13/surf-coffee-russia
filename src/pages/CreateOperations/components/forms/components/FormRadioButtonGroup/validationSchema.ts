import { yup } from '@app/core'

export const createSchema = (name: string, errorMessage: string) => ({
  [name]: yup.mixed().required(errorMessage).typeError(errorMessage),
})
