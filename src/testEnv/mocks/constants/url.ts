import { getYearMonth } from '@utils'

const [year, month] = getYearMonth(new Date())

export const CURRENT_MONTH_YEAR_MOCK_URL_PARAMS = {
  year,
  month,
}
