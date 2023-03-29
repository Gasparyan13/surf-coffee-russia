import { MONTHS_EN_SHORT } from '@common/constants/common'

export const MONTHS_EN_SHORT_BY_INDEX = Object.keys(MONTHS_EN_SHORT)
  .slice(12)
  .reduce((acc, m, i) => ({ ...acc, [m]: i }), {} as { [k: string]: number })
