import { TableHeaderCell } from '@uiKit/components/Table/Table.types'

import { headerCellCSS } from '../SpotMetricsTable.styled'

export const headerColumns: TableHeaderCell[] = [
  {
    key: 'iiko',
    title: 'Данные из iiko',
    cssStyle: headerCellCSS,
    width: 170,
  },
  {
    key: 'plan',
    title: 'План',
    width: 164,
    align: 'right',
    cssStyle: headerCellCSS,
  },
  {
    key: 'fact',
    title: 'Факт',
    width: 164,
    align: 'right',
    cssStyle: headerCellCSS,
  },
]
