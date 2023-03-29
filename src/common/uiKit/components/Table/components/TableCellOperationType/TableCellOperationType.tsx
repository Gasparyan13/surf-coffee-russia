import React from 'react'

import { Operations } from '@constants'

import { Typography } from '../../../Typography'
import { TableCell } from '../TableCell'
import * as Styled from './TableCellOperationType.styled'
import * as T from './TableCellOperationType.types'
import { iconByOperationType } from './constants/iconByOperationType'

export const TableCellOperationType: React.FC<T.Props> = ({
  operationType,
  ...restCellProps
}) => {
  const Icon = iconByOperationType[operationType]

  return (
    <TableCell {...restCellProps}>
      <Styled.Content>
        <Icon />
        <Typography variant="PBody">
          {Operations[operationType].titleForCell}
        </Typography>
      </Styled.Content>
    </TableCell>
  )
}
