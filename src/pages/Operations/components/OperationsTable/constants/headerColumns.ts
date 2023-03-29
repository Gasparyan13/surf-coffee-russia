import { TableHeaderCell } from '@uiKit/components/Table/Table.types'

export const headerColumns: TableHeaderCell[] = [
  {
    key: 'date',
    title: 'Дата',
    width: 126,
  },
  {
    key: 'operationType',
    title: 'Тип операции',
    width: 176,
  },
  {
    key: 'operationDirection',
    title: 'Вид операции',
    width: 122,
  },
  {
    key: 'contractor',
    title: 'Контрагент',
  },
  {
    key: 'article',
    title: 'Статья',
  },
  {
    key: 'productName',
    title: 'Наименование',
  },
  {
    key: 'money',
    title: 'Сумма, ₽',
    align: 'right',
    width: 155,
  },
]
