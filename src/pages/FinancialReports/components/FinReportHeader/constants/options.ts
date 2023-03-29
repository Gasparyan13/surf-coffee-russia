import { Props as ListRowProps } from '@uiKit/components/ListRow/ListRow.types'

import { getYearsOptions } from '../utils/getters'

export const yearOptions: ListRowProps[] = getYearsOptions(12).map((year) => ({
  text: `${year} год`,
  value: year,
  key: year,
}))
