import { CircularProgress } from '@mui/material'
import React, { useCallback } from 'react'

import { NumberFormat } from '@common/newUi/NumberFormat'

import { Table, TableCell, TableRow } from '@uiKit'

import { EnterpriseWorkerViewDto } from '@rtkApi/modules/__generated__/enterprise'

import { useWorkerEmployeeIdCtx } from '../../containers/WorkersEmployeeCtx'
import * as Styled from './EmployeesListTable.styled'
import * as T from './EmployeesListTable.types'
import { headerColumns } from './constants/tableHeader'

export const EmployeesListTable: React.FC<T.Props> = ({
  maxHeight,
  workersData,
}) => {
  const { setEmployeeId, isFetchingTable } = useWorkerEmployeeIdCtx()

  const rowRenderer = useCallback(
    (item: EnterpriseWorkerViewDto, index: number, key: string) => {
      const handleRowClick = () => setEmployeeId(item.id)

      return (
        <TableRow key={key} index={index} onClick={handleRowClick}>
          <TableCell>{item.firstAndLastName}</TableCell>
          <TableCell>{item.roleName}</TableCell>
          <TableCell>{item.enterpriseName}</TableCell>
          <TableCell align="right" fontStyle="bold">
            <NumberFormat value={item.payRate} />
          </TableCell>
          <TableCell cssStyle={Styled.rateCellCSS}>в час</TableCell>
        </TableRow>
      )
    },
    [setEmployeeId],
  )

  return (
    <Styled.Root>
      <Table
        header={headerColumns}
        maxHeight={maxHeight}
        rowRenderer={rowRenderer}
        rows={workersData ?? []}
      />
      {isFetchingTable && (
        <Styled.Loader>
          <Styled.Spinner>
            <CircularProgress />
          </Styled.Spinner>
        </Styled.Loader>
      )}
    </Styled.Root>
  )
}
