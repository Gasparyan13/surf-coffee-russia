import { yup } from '@app/core'

import { YUP_ENTER_EMAIL, YUP_REQUIRED_FIELD } from '@constants'

import { AddEmployeeForm } from '../DialogAddEmployee.types'
import { getIsPrice } from '../utils/getters'

export const JOB_TITLE = [{ id: 1, title: 'Бариста', value: 'BARISTA' }]

export const defaultValues: AddEmployeeForm = {
  firstAndLastName: '',
  email: '',
  payRate: '',
  jobTitle: JOB_TITLE[0].value,
  spot: '',
}

export const schema = yup.object().shape({
  firstAndLastName: yup
    .string()
    .sameLanguageFirstLastName()
    .required(YUP_REQUIRED_FIELD),
  email: yup.string().email(YUP_ENTER_EMAIL).required(YUP_REQUIRED_FIELD),
  payRate: yup
    .string()
    .required('')
    .test('checkSum', '', (payRate) => {
      return typeof payRate === 'string' ? getIsPrice(payRate) : false
    }),
})
