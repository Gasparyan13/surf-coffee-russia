import { EOperationsType } from '@common/types/Operations'

import { Props as TableCellProps } from '../TableCell/TableCell.types'

export type Props = {
  operationType: `${EOperationsType}`
} & Omit<TableCellProps, 'children'>
