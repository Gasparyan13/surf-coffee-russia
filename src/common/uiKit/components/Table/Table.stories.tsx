import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { makeNumberedArray } from '../../../helpers/arrays'
import { Table } from './Table'
import { TableCell } from './components/TableCell'
import { TableRow } from './components/TableRow'
import { TableRowExpanded } from './components/TableRowExpanded'

export default {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
    jest: ['Table.test.tsx'],
  },
} as ComponentMeta<typeof Table>

const Template = makeStoryTemplate((props) => (
  <div style={{ width: 800 }}>
    <Table {...props} />
  </div>
))

const rows = makeNumberedArray(6, 1).map((data) => ({
  Employee: `Сергей Петрович ${data}`,
  Position: 'Бариста',
  Spot: 'Кафе “Мечта”',
  Rate: '1 000',
  RateAmount: 'в час',
}))

const commonArgs = {
  header: [
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
  ],
  rows,
}

const rowRenderer = (item: typeof rows[0], index: number, key: string) => {
  const cells = Object.keys(item)
  const getCellKey = (rowKey: string, cellIndex: number) =>
    `${rowKey}-cell-${cellIndex}`

  return (
    <TableRow key={key} index={index}>
      {cells.map((cell, cellIndex) => (
        <TableCell
          key={getCellKey(key, cellIndex)}
          align={cell === 'Rate' ? 'right' : 'left'}
          fontStyle={cell === 'Rate' ? 'bold' : 'normal'}>
          {item[cell as keyof typeof item]}
        </TableCell>
      ))}
    </TableRow>
  )
}

export const Default = Template.bind({})

Default.args = {
  ...commonArgs,
  rowRenderer,
}

const expandedRowRenderer = (
  item: typeof rows[0],
  index: number,
  key: string,
) => {
  const cells = Object.keys(item)
  const getCellKey = (rowKey: string, cellIndex: number) =>
    `${rowKey}-cell-${cellIndex}`

  return (
    <TableRowExpanded key={key} columnsLength={cells.length} content={key}>
      {cells.map((cell, cellIndex) => (
        <TableCell
          key={getCellKey(key, cellIndex)}
          align={cell === 'Rate' ? 'right' : 'left'}
          fontStyle={cell === 'Rate' ? 'bold' : 'normal'}>
          {item[cell as keyof typeof item]}
        </TableCell>
      ))}
    </TableRowExpanded>
  )
}

export const Expanded = Template.bind({})

Expanded.args = {
  ...commonArgs,
  header: commonArgs.header.concat([
    {
      key: 'Empty',
      title: '',
    },
  ]),
  rowRenderer: expandedRowRenderer,
}
