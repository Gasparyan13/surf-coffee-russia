import React from 'react'

import { SvgCashOrdersIcon } from '@common/IconComponents/SvgCashOrdersIcon'
import { SvgPaymentInvoiceIcon } from '@common/IconComponents/SvgPaymentInvoiceIcon'
import { SvgPlannedOperationIcon } from '@common/IconComponents/SvgPlannedOperationIcon'
import { SvgReceiptIcon } from '@common/IconComponents/SvgReceiptIcon'
import { SvgServiceActIcon } from '@common/IconComponents/SvgServiceActIcon'
import { SvgTransactionIcon } from '@common/IconComponents/SvgTransactionIcon'
import { SvgWaybillIcon } from '@common/IconComponents/SvgWaybillIcon'
import { SvgIconProps } from '@common/IconComponents/types'
import { EOperationsType } from '@common/types/Operations'

export const iconByOperationType: Record<
  EOperationsType,
  React.FC<SvgIconProps>
> = {
  [EOperationsType.CashOrders]: SvgCashOrdersIcon,
  [EOperationsType.PaymentInvoice]: SvgPaymentInvoiceIcon,
  [EOperationsType.ServiceAct]: SvgServiceActIcon,
  [EOperationsType.Transaction]: SvgTransactionIcon,
  [EOperationsType.Waybill]: SvgWaybillIcon,
  [EOperationsType.Receipt]: SvgReceiptIcon,
  [EOperationsType.PlannedOperation]: SvgPlannedOperationIcon,
}
