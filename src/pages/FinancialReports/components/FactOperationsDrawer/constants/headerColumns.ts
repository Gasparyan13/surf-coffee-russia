import { TableHeaderCell } from '@uiKit/components/Table/Table.types'

import { firstColumnCSS } from '../FactOperationsDrawer.styled'

export const headerColumns: TableHeaderCell[] = [
  {
    key: 'operationType',
    title: 'Тип операции',
    cssStyle: firstColumnCSS,
    width: 210,
  },
  {
    key: 'contractor',
    title: 'Контрагент',
    width: 200,
  },
  {
    key: 'date',
    title: 'Дата',
    width: 120,
  },
  {
    key: 'money',
    title: 'Сумма, ₽',
    align: 'right',
  },
]
