import React, { useCallback, useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { AppLoader } from '@app/containers/AppLoader'

import { NumberFormat } from '@common/newUi/NumberFormat/NumberFormat'
import { EOperationsType } from '@common/types/Operations'

import { DateHelper } from '@helpers'

import { useDimensions } from '@hooks'

import { Drawer, Table, TableCell, TableRow, Typography } from '@uiKit'

import { setOperationDrawerState } from '@pages/CreateOperations/redux/createOperation/slice'

import { useLazyGetFinancialPlannedOperationsPlannedAmountsByBudgetItemsQuery } from '@rtkApi/modules/__generated__/financial'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'
import { useAppDispatch, useAppSelector } from '@store/rootConfig'

import { ERROR_TRANSACTIONS_MESSAGE } from '../TableCell/constants/messages'
import * as Styled from './PlanOperationsDrawer.styled'
import * as T from './PlanOperationsDrawer.types'
import { headerColumns } from './constants/headerColumns'

export const PlanOperationsDrawer: React.FC<T.Props> = ({
  budgetItemId,
  budgetItemName,
  yearMonth,
  open,
  onClose,
  reportType,
  planOrFactType,
}) => {
  const [ref, { height }] = useDimensions()
  const dispatch = useAppDispatch()

  const enterpriseId = useAppSelector(getManagerCurrentProjectId)

  const [apiGetOperations, { isLoading: isLoadingGetOperations }] =
    useLazyGetFinancialPlannedOperationsPlannedAmountsByBudgetItemsQuery()

  const [data, setData] = useState<T.DrowerData>({
    total: 0,
    operations: [],
  })

  const rowRenderer = useCallback(
    (item: T.Operation, index: number, key: string) => {
      const handleOpenOperationDrawer = () => {
        dispatch(
          setOperationDrawerState({
            type: EOperationsType.PlannedOperation,
            title: 'Плановая операция',
            operationId: item.id,
          }),
        )
      }

      return (
        <TableRow key={key} index={index} onClick={handleOpenOperationDrawer}>
          <TableCell cssStyle={Styled.firstColumnCSS}>
            {item.isWriteOff ? 'Списание' : 'Поступление'}
          </TableCell>
          <TableCell>
            {DateHelper.formatServerDateToClient(item.dateOfPayment)}
          </TableCell>
          <TableCell>
            {DateHelper.formatServerDateToClient(item.dateOfReceiving)}
          </TableCell>
          <TableCell>{item.contractor}</TableCell>
          <TableCell align="right" fontStyle="bold">
            <NumberFormat value={item.money} />
          </TableCell>
        </TableRow>
      )
    },
    [dispatch],
  )

  useLayoutEffect(() => {
    let mounted = true

    const handleLoadFinancialOperations = async () => {
      try {
        if (!enterpriseId || !yearMonth || !budgetItemId || !planOrFactType)
          return

        const operationsData = await apiGetOperations({
          enterpriseId,
          yearMonth,
          budgetItemId,
          reportType,
        }).unwrap()

        if (mounted) {
          setData(operationsData as unknown as T.DrowerData)
        }
      } catch (e) {
        toast.error(ERROR_TRANSACTIONS_MESSAGE)
      }
    }
    if (open) {
      handleLoadFinancialOperations()
    }

    return () => {
      mounted = false
      setData({
        total: 0,
        operations: [],
      })
    }
  }, [
    enterpriseId,
    budgetItemId,
    yearMonth,
    open,
    planOrFactType,
    reportType,
    apiGetOperations,
  ])

  return (
    <Drawer
      footerProps={{
        content: (
          <Styled.FooterRow>
            <Styled.TotalTextContainer>
              <Typography variant="PBody">Итоговая сумма:</Typography>
              <Styled.TotalSum variant="PBody">
                <NumberFormat value={data.total} /> ₽
              </Styled.TotalSum>
            </Styled.TotalTextContainer>
          </Styled.FooterRow>
        ),
      }}
      headerProps={{
        date: yearMonth,
        title: budgetItemName || '',
        closeButtonProps: {
          onClick: onClose,
        },
      }}
      open={open}
      onClose={onClose}>
      <Styled.Root ref={ref}>
        {isLoadingGetOperations ? (
          <AppLoader />
        ) : (
          <Table
            header={headerColumns}
            maxHeight={height}
            rowRenderer={rowRenderer}
            rows={data.operations}
          />
        )}
      </Styled.Root>
    </Drawer>
  )
}
