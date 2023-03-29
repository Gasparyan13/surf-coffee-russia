/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import buildLocalizeFn from 'date-fns/locale/_lib/buildLocalizeFn'
import ru from 'date-fns/locale/ru'
import cloneDeep from 'lodash.clonedeep'

import { MONTHS_RU } from '../../../../constants/common'

const monthValues = {
  narrow: MONTHS_RU.map((month) => month.slice(0, 2)),
  abbreviated: MONTHS_RU,
  wide: MONTHS_RU,
}

const adapterLocale = cloneDeep(ru)

if (adapterLocale.localize) {
  adapterLocale.localize.month = buildLocalizeFn({
    values: monthValues,
    defaultWidth: 'wide',
    defaultFormattingWidth: 'wide',
  })
}

export { adapterLocale }
