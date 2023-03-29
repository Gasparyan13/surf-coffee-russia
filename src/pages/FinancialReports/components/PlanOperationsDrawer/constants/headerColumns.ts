import { TableHeaderCell } from '@uiKit/components/Table/Table.types'

import { firstColumnCSS } from '../PlanOperationsDrawer.styled'

export const headerColumns: TableHeaderCell[] = [
  {
    key: 'operationType',
    title: 'Тип',
    width: 140,
    cssStyle: firstColumnCSS,
  },
  {
    key: 'paymentDate',
    title: 'Дата оплаты',
    width: 140,
  },
  {
    key: 'receiveDate',
    title: 'Дата начисления',
    width: 145,
  },

  {
    key: 'contractor',
    title: 'Контрагент',
  },
  {
    key: 'money',
    title: 'Сумма, ₽',
    align: 'right',
    width: 100,
  },
]
