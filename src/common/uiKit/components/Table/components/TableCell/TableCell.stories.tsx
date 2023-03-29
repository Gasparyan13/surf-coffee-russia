import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { TableCell } from './TableCell'

export default {
  title: 'Atoms/Table/TableCell',
  component: TableCell,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
    jest: ['TableCell.test.tsx'],
  },
} as ComponentMeta<typeof TableCell>

const Template = makeStoryTemplate((props) => <TableCell {...props} />)

export const Default = Template.bind({})

Default.args = {
  children: 'Test Cell',
}
