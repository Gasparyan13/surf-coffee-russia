import { getCurrentYear } from '../../../../../../../common/utils'
import { getYearMonthOptions } from '../utils/getters'

export const currentYearOptions = getYearMonthOptions(getCurrentYear())
