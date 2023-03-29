import React, { useCallback, useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { AppLoader } from '@app/containers/AppLoader'

import { SvgPurchaseIcon } from '@common/IconComponents/SvgPurchaseIcon'
import { SvgSellIcon } from '@common/IconComponents/SvgSellIcon'
import { NumberFormat } from '@common/newUi/NumberFormat'

import { DateHelper } from '@helpers'

import { useDimensions } from '@hooks'

import {
  Drawer,
  Table,
  TableCell,
  TableCellWithTooltip,
  TableRow,
} from '@uiKit'

import { setOperationDrawerState } from '@pages/CreateOperations/redux/createOperation/slice'

import {
  FactualExpensesPerOperationViewDto,
  useLazyGetFinancialExpensesCashFlowOperationsViewQuery,
  useLazyGetFinancialExpensesPnlOperationsViewQuery,
} from '@rtkApi/modules/__generated__/financial'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'
import { useAppDispatch, useAppSelector } from '@store/rootConfig'

import { createTestId } from '@testEnv/utils/testId/createTestId'

import { ERROR_TRANSACTIONS_MESSAGE } from '../TableCell/constants/messages'
import * as Styled from './FactOperationsDrawer.styled'
import * as T from './FactOperationsDrawer.types'
import { dateTypes, operationTypes } from './constants/cellHelperText'
import { factOperationEditDrawerData } from './constants/factOperationEditDrawerData'
import { headerColumns } from './constants/headerColumns'
import { TEST_ID_ICON_PURCHASE, TEST_ID_ICON_SELL } from './constants/testIds'

export const FactOperationsDrawer: React.FC<T.Props> = ({
  budgetItemId,
  budgetItemName,
  yearMonth,
  open,
  onClose,
  reportType,
}) => {
  const [ref, { height }] = useDimensions()
  const dispatch = useAppDispatch()

  const enterpriseId = useAppSelector(getManagerCurrentProjectId)

  const [
    apiRequestCashFlowOperations,
    { isLoading: isLoadingGetCashFlowOperation },
  ] = useLazyGetFinancialExpensesCashFlowOperationsViewQuery()

  const [apiRequestPnlOperations, { isLoading: isLoadingGetPnlOperation }] =
    useLazyGetFinancialExpensesPnlOperationsViewQuery()

  const [rows, setRows] = useState<
    Required<FactualExpensesPerOperationViewDto>[]
  >([])

  const rowRenderer = useCallback(
    (
      item: Required<FactualExpensesPerOperationViewDto>,
      index: number,
      key: string,
    ) => {
      const handleOpenOperationDrawer = () => {
        /* TODO after backend changed operationType to Enum value,
          used Operations from src/pages/CreateOperations/constants/menu.ts for get id,
          title and remove factOperationEditDrawerData
        */
        const operationType = factOperationEditDrawerData[item.operationType].id

        dispatch(
          setOperationDrawerState({
            type: operationType,
            title: item.operationType,
            operationId: item.operationId,
          }),
        )
      }

      return (
        <TableRow key={key} index={index} onClick={handleOpenOperationDrawer}>
          <TableCellWithTooltip
            cssStyle={Styled.firstColumnCSS}
            tooltipAnchorCss={Styled.tooltipAnchorCSS}
            tooltipTitle={
              item.isIncome ? operationTypes.sell : operationTypes.purchase
            }>
            <Styled.CellIcon>
              {item.isIncome ? (
                <SvgSellIcon {...createTestId(TEST_ID_ICON_SELL)} />
              ) : (
                <SvgPurchaseIcon {...createTestId(TEST_ID_ICON_PURCHASE)} />
              )}
            </Styled.CellIcon>
            {item.operationType}
          </TableCellWithTooltip>
          <TableCell>{item.contractor}</TableCell>
          <TableCellWithTooltip tooltipTitle={dateTypes[item.operationType]}>
            {DateHelper.formatServerDateToClient(item.date)}
          </TableCellWithTooltip>
          <TableCell
            align="right"
            cssStyle={item.isIncome ? undefined : Styled.criticalColumnCSS}
            fontStyle="bold">
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
        if (!enterpriseId || !yearMonth || !budgetItemId) return

        let data: FactualExpensesPerOperationViewDto[] = []

        if (reportType === 'pnl') {
          data = await apiRequestPnlOperations({
            enterpriseId,
            yearMonth,
            budgetItemId,
          }).unwrap()
        } else {
          data = await apiRequestCashFlowOperations({
            enterpriseId,
            yearMonth,
            budgetItemId,
          }).unwrap()
        }

        if (mounted) {
          setRows(data as Required<FactualExpensesPerOperationViewDto>[])
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
      setRows([])
    }
  }, [
    enterpriseId,
    budgetItemId,
    yearMonth,
    open,
    reportType,
    apiRequestPnlOperations,
    apiRequestCashFlowOperations,
  ])

  return (
    <Drawer
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
        {isLoadingGetCashFlowOperation || isLoadingGetPnlOperation ? (
          <AppLoader />
        ) : (
          <Table
            header={headerColumns}
            maxHeight={height}
            rowRenderer={rowRenderer}
            rows={rows}
          />
        )}
      </Styled.Root>
    </Drawer>
  )
}
