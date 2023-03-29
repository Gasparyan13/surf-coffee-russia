import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { TableCellWithTooltip } from './TableCellWithTooltip'

export default {
  title: 'Atoms/Table/TableCellWithTooltip',
  component: TableCellWithTooltip,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
    jest: ['TableCellWithTooltip.test.tsx'],
  },
} as ComponentMeta<typeof TableCellWithTooltip>

const Template = makeStoryTemplate((props) => (
  <TableCellWithTooltip {...props} />
))

export const Default = Template.bind({})

Default.args = {
  children: 'Test Cell',
  tooltipTitle: 'Tooltip',
  tooltipPlacement: 'below-left',
}
