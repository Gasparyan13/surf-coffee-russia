import { yup } from '@app/core'

import { innRegExp } from '@constants'

import { CounterpartiesData } from '../ModalCounterparty.types'

export const options = [
  {
    label: 'Физическое лицо',
  },
  {
    label: 'Юридическое лицо',
  },
]

export const defaultValues: CounterpartiesData = {
  readOnly: false,
  searchAlias: '',
  typeSwitch: true,
  alias: '',
  aliasEntity: '',
  orgName: '',
  ogrn: '',
  inn: '',
  kpp: '',
}

export const schema = yup.object().shape({
  alias: yup.string().when('typeSwitch', {
    is: true,
    then: yup.string().required('Название не указано'),
  }),
  aliasEntity: yup.string().when('typeSwitch', {
    is: false,
    then: yup.string().required('Название не указано'),
  }),
  inn: yup
    .string()
    .when('typeSwitch', {
      is: false,
      then: yup
        .string()
        .required('ИНН не указан')
        .matches(innRegExp, 'ИНН должен состоять из 10 или 12 цифр'),
    })
    .nullable(),
})
