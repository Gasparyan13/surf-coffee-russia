import { TableHeaderCell } from '@uiKit/components/Table/Table.types'

export const headerColumns: TableHeaderCell[] = [
  {
    key: 'Employee',
    title: 'Сотрудник',
    width: 204,
  },
  {
    key: 'Position',
    title: 'Должность',
    width: 172,
  },
  {
    key: 'Spot',
    title: 'Спот',
    width: 364,
  },
  {
    key: 'Rate',
    title: 'Ставка, ₽',
    align: 'right',
    width: 204,
  },
  {
    key: 'RateAmount',
    title: '',
    width: 174,
  },
]
