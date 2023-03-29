import React from 'react'

import { TableColumnType } from '../../../TableRow/TableRow.types'
import { TableCellProps } from '../../TableCell.types'

export type TextVariantProps = {
  disabled?: boolean
  children?: string | React.ReactNode
}

export type FinReportTableCellText = 'BOLD' | 'TITLE' | 'REGULAR'

export type Props = {
  testId?: string
  tableColumnType: TableColumnType
  type: FinReportTableCellText
  numberFormat?: 'integer' | 'float'
} & Pick<TableCellProps, 'text' | 'isNumber' | 'isEditable' | 'disabled'>
