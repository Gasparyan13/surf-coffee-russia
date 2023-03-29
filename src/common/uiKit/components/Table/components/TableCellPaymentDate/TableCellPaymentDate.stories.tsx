import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { TableCellPaymentDate } from './TableCellPaymentDate'

export default {
  title: 'Atoms/Table/TableCellPaymentDate',
  component: TableCellPaymentDate,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
    jest: ['TableCellPaymentDate.test.tsx'],
  },
} as ComponentMeta<typeof TableCellPaymentDate>

const Template = makeStoryTemplate((props) => (
  <TableCellPaymentDate {...props} />
))

export const Default = Template.bind({})

Default.args = {
  paymentDate: '2022-12-02',
  receivedDate: '2022-12-11',
}

export const PaymentDateOnly = Template.bind({})

PaymentDateOnly.args = {
  paymentDate: '2022-12-02',
}
