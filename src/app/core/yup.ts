import * as baseYup from 'yup'

import { YUP_ENTER_FIRST_LAST_NAME } from '../../common/constants/messages/validationError'
import {
  englishLettersRegExp,
  firstLastNameRegExp,
  russianLettersRegExp,
} from '../../common/constants/regExps'

baseYup.addMethod<baseYup.StringSchema>(
  baseYup.string,
  'sameLanguageFirstLastName',
  function (message = YUP_ENTER_FIRST_LAST_NAME) {
    return this.test('sameLanguageFirstLastName', message, function (value) {
      const { path, createError } = this

      if (!value) {
        return createError({ path, message })
      }

      const isValidFirstAndLastName = (v: string) =>
        (russianLettersRegExp.test(v) || englishLettersRegExp.test(v)) &&
        firstLastNameRegExp.test(v)

      if (!isValidFirstAndLastName(value)) {
        return createError({
          path,
          message,
        })
      }

      return true
    })
  },
)

export const yup = baseYup
