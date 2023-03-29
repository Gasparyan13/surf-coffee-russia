import React, { useCallback } from 'react'

import { NumberFormat } from '@common/newUi/NumberFormat'

import { SearchTextHighlighter } from '@components'

import { Operations } from '@constants'

import {
  Table,
  TableCell,
  TableCellOperationType,
  TableCellPaymentDate,
  TableRow,
} from '@uiKit'

import { setOperationDrawerState } from '@pages/CreateOperations/redux/createOperation/slice'

import { useAppDispatch } from '@store/rootConfig'

import * as Styled from './OperationsTable.styled'
import * as T from './OperationsTable.types'
import { headerColumns } from './constants/headerColumns'
import { operationDirection } from './constants/operationDirection'

export const OperationsTable: React.FC<T.Props> = ({ rows, searchValue }) => {
  const dispatch = useAppDispatch()

  const rowRenderer = useCallback(
    (item: T.OperationRow, index: number, key: string) => {
      const handleOpenOperationDrawer = () => {
        const operation = Operations[item.operationType!]

        dispatch(
          setOperationDrawerState({
            type: operation.id,
            title: operation.title,
            operationId: item.operationId,
          }),
        )
      }

      return (
        <TableRow key={key} index={index} onClick={handleOpenOperationDrawer}>
          <TableCellPaymentDate
            operationType={item.operationType!}
            paymentDate={item.dateOfPayment!}
            receivedDate={item.dateOfReceiving}
          />
          <TableCellOperationType operationType={item.operationType!} />
          <TableCell>{operationDirection[item.operationKind!]}</TableCell>
          <TableCell>
            <SearchTextHighlighter
              searchWords={searchValue}
              value={item.contractorName}
            />
          </TableCell>
          <TableCell>
            <SearchTextHighlighter
              searchWords={searchValue}
              value={item.budgetItemName}
            />
          </TableCell>
          <TableCell>
            <SearchTextHighlighter
              searchWords={searchValue}
              value={item.productName}
            />
          </TableCell>
          <TableCell align="right" fontStyle="bold">
            <NumberFormat value={item.amount} />
          </TableCell>
        </TableRow>
      )
    },
    [searchValue],
  )

  return (
    <Styled.Root>
      <Table
        bodyCSS={Styled.bodyCSS}
        header={headerColumns}
        headerCSS={Styled.headerCSS}
        minWidth={510}
        rowRenderer={rowRenderer}
        rows={rows}
      />
    </Styled.Root>
  )
}
