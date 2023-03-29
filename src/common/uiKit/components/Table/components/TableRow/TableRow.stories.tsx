import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { makeNumberedArray } from '@helpers'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { TableCell } from '../TableCell'
import { TableRow } from './TableRow'

export default {
  title: 'Atoms/Table/TableRow',
  component: TableRow,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
    jest: ['TableRow.test.tsx'],
    actions: {
      argTypesRegex: '^on.*',
    },
  },
} as ComponentMeta<typeof TableRow>

const Template = makeStoryTemplate((props) => <TableRow {...props} />)

export const Default = Template.bind({})

const cells = (
  <>
    {makeNumberedArray(4, 1).map((value) => (
      <TableCell key={value}>{`Column-${value}`}</TableCell>
    ))}
  </>
)

Default.args = {
  children: cells,
  index: 0,
}
