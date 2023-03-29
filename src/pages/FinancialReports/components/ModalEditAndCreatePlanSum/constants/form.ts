import { yup } from '@app/core'

export const defaultValues = {
  expenseType: '',
  sum: '',
}

export const schema = yup.object().shape({})
