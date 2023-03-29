import { PATHS } from '@common/constants'

export const options = [
  { label: 'P&L' },
  { label: 'ОДДС' },
  { label: 'Баланс' },
]

export const tabIndexByPath = {
  [PATHS.financialReports.pnl]: 0,
  [PATHS.financialReports.cashFlow]: 1,
  [PATHS.financialReports.balance]: 2,
}

export const pathByTabIndex = Object.keys(tabIndexByPath).reduce(
  (acc, path) => ({ ...acc, [tabIndexByPath[path]]: path }),
  {} as { [k: number]: string },
)
