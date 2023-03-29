import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { makeNumberedArray } from '@helpers'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { TableCell } from '../TableCell'
import { TableRowExpanded } from './TableRowExpanded'

export default {
  title: 'Atoms/Table/TableRowExpanded',
  component: TableRowExpanded,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
    jest: ['TableRowExpanded.test.tsx'],
  },
} as ComponentMeta<typeof TableRowExpanded>

const Template = makeStoryTemplate((props) => <TableRowExpanded {...props} />)

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
  content: 'Expanded Content',
  columnsLength: 4,
}
