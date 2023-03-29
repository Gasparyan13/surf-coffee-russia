import React from 'react'

import { makeNumberedArray } from '@common/helpers'

import { render } from '@testEnv/utils'

import { Table } from './Table'
import { Props as TableProps, TableHeaderCell } from './Table.types'

const header: TableHeaderCell[] = [
  {
    key: 'Employee',
    title: 'Сотрудник',
  },
  {
    key: 'Position',
    title: 'Должность',
  },
  {
    key: 'Spot',
    title: 'Спот',
  },
  {
    key: 'Rate',
    title: 'Ставка, ₽',
    align: 'right',
  },
  {
    key: 'RateAmount',
    title: '',
  },
]

const mockRows = makeNumberedArray(2, 1).map((data) => ({
  Employee: `Сергей Петрович ${data}`,
  Position: 'Бариста',
  Spot: 'Кафе “Мечта”',
  Rate: '1 000',
  RateAmount: 'в час',
}))

const rowRenderer = (item: typeof mockRows[0], index: number, key: string) => {
  const cells = Object.keys(item)
  const getCellKey = (rowKey: string, cellIndex: number) =>
    `${rowKey}-cell-${cellIndex}`

  return (
    <tr key={key}>
      {cells.map((cell, cellIndex) => (
        <th key={getCellKey(key, cellIndex)}>
          {item[cell as keyof typeof item]}
        </th>
      ))}
    </tr>
  )
}

describe('<Table />', () => {
  const renderTable = ({
    rows = mockRows,
    contentEmptyRowRenderer = undefined,
  }: Partial<TableProps<typeof mockRows[0]>>) =>
    render(
      <Table
        contentEmptyRowRenderer={contentEmptyRowRenderer}
        header={header}
        rowRenderer={rowRenderer}
        rows={rows}
      />,
    )

  test('render correct table header', async () => {
    const { getByRole } = renderTable({})

    const table = getByRole('table')
    const headerCells = table.querySelectorAll('thead > tr > th')

    headerCells.forEach((node, index) => {
      expect(node).toContainHTML(header[index].title)
    })
  })

  test('render correct number of rows', async () => {
    const { getByRole } = renderTable({})

    const table = getByRole('table')
    const tableRows = table.querySelectorAll('tbody > tr')

    expect(tableRows.length).toEqual(mockRows.length)
  })

  test('render default empty rows content', async () => {
    const { getByRole } = renderTable({ rows: [] })

    const table = getByRole('table')

    const tableRow = table.querySelectorAll('tbody > tr')
    expect(tableRow.length).toBe(1)

    const tableCell = table.querySelectorAll('tbody > tr > td')
    expect(tableCell.length).toBe(1)
    expect(tableCell[0]).toHaveTextContent(/Ничего не найдено/)
  })

  test('render passed empty rows content', async () => {
    const { getByRole } = renderTable({
      rows: [],
      contentEmptyRowRenderer: () => 'Тест',
    })

    const table = getByRole('table')

    const tableRow = table.querySelectorAll('tbody > tr')
    expect(tableRow.length).toBe(1)

    const tableCell = table.querySelectorAll('tbody > tr > td')
    expect(tableCell.length).toBe(1)
    expect(tableCell[0]).toHaveTextContent('Тест')
  })
})
