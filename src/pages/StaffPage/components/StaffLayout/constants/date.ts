import { YEAR_MONTH_FORMAT } from '@constants'

import { DateHelper } from '@helpers'

export const today = DateHelper.toFormat(new Date(), YEAR_MONTH_FORMAT)
