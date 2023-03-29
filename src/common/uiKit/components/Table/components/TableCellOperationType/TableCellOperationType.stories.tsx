import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { EOperationsType } from '@common/types/Operations'

import { makeStoryTemplate } from '@providers/makeStoryTemplate'

import { TableCellOperationType } from './TableCellOperationType'

export default {
  title: 'Atoms/Table/TableCellOperationType',
  component: TableCellOperationType,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    layout: 'centered',
    jest: ['TableCellOperationType.test.tsx'],
  },
} as ComponentMeta<typeof TableCellOperationType>

const Template = makeStoryTemplate((props) => (
  <TableCellOperationType {...props} />
))

export const CashOrders = Template.bind({})

CashOrders.args = {
  operationType: EOperationsType.CashOrders,
}

export const PaymentInvoice = Template.bind({})

PaymentInvoice.args = {
  operationType: EOperationsType.PaymentInvoice,
}

export const ServiceAct = Template.bind({})

ServiceAct.args = {
  operationType: EOperationsType.ServiceAct,
}

export const Transaction = Template.bind({})

Transaction.args = {
  operationType: EOperationsType.Transaction,
}

export const Waybill = Template.bind({})

Waybill.args = {
  operationType: EOperationsType.Waybill,
}

export const Receipt = Template.bind({})

Receipt.args = {
  operationType: EOperationsType.Receipt,
}

export const PlannedOperation = Template.bind({})

PlannedOperation.args = {
  operationType: EOperationsType.PlannedOperation,
}
