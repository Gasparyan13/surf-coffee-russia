import React, { useCallback, useRef, useState } from 'react'
import { useLocation } from 'react-router'

import { PATHS } from '@common/constants'
import { WARNING_DATA_LOSS } from '@common/constants/messages/warning'

import { DateHelper } from '@helpers'

import { useLocationQuery } from '@hooks'

import { Dialog } from '@uiKit'
import { Props as ButtonProps } from '@uiKit/components/Dialog/components/DialogButton'

import { OperationsReportUrlSearchParams } from '@pages/Operations/components/OperationsReport/constants/urlSearchParams'

import {
  useLazyGetAnalyticsBalanceSheetByEnterpriseIdQuery,
  useLazyGetAnalyticsCashFlowReportQuery,
  useLazyGetAnalyticsPlanFactExpensesReportQuery,
} from '@rtkApi/modules/__generated__/analytics'
import { useLazyGetFinancialOperationsGeneralViewQuery } from '@rtkApi/modules/__generated__/financial'

import { useAppDispatch, useAppSelector } from '@store/rootConfig'

import { getFinancialReportReqArgs } from '../../../FinancialReports/redux/financialReport/selectors'
import { CreateOperationsDrawer } from '../../components/CreateOperationsDrawer'
import { CREATE_OPERATION_FORMS } from '../../constants/forms'
import { getOperationDrawerState } from '../../redux/createOperation/selectors'
import { setOperationDrawerState } from '../../redux/createOperation/slice'
import * as T from './Main.types'

export const Main: React.FC = () => {
  const formRef = useRef<T.RefType>(null)
  const operationDrawer = useAppSelector(getOperationDrawerState)
  const lastReportTableArgs = useAppSelector(getFinancialReportReqArgs)
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const { get } = useLocationQuery()

  const startDate = get(OperationsReportUrlSearchParams.startDate)
  const endDate = get(OperationsReportUrlSearchParams.endDate)
  const articleId = get(OperationsReportUrlSearchParams.articleId)
  const operationType = get(OperationsReportUrlSearchParams.operationType)
  const contractorId = get(OperationsReportUrlSearchParams.contractorId)
  const operationKind = get(OperationsReportUrlSearchParams.operationKind)
  const minAmount = get(OperationsReportUrlSearchParams.minAmount)
  const maxAmount = get(OperationsReportUrlSearchParams.maxAmount)

  const [apiBalanceSheetRequest] =
    useLazyGetAnalyticsBalanceSheetByEnterpriseIdQuery()
  const [apiAnalyticsCashFlowReport] = useLazyGetAnalyticsCashFlowReportQuery()
  const [apiPnlRequest] = useLazyGetAnalyticsPlanFactExpensesReportQuery()
  const [apiGetOperations] = useLazyGetFinancialOperationsGeneralViewQuery()

  const [openConfirm, setOpenConfirm] = useState(false)
  const [disabledFooter, setDisabledFooter] = useState(false)

  const handleCancelConfirmClick = useCallback(() => {
    setOpenConfirm(false)
  }, [])

  const handleAdd = useCallback(async () => {
    formRef.current?.onSubmit()
  }, [])

  const handleUpdateOperationsTable = useCallback(async () => {
    if (pathname === PATHS.operations && startDate && endDate) {
      await apiGetOperations({
        dateFrom: DateHelper.formatClientDateToServer(startDate),
        dateTo: DateHelper.formatClientDateToServer(endDate),
        budgetItemId: articleId || undefined,
        amountFrom: minAmount || undefined,
        amountTo: maxAmount || undefined,
        contractorId: contractorId || undefined,
        operationKind: operationKind || undefined,
        operationType: operationType || undefined,
      }).unwrap()
    }
  }, [
    apiGetOperations,
    articleId,
    contractorId,
    endDate,
    maxAmount,
    minAmount,
    operationKind,
    operationType,
    pathname,
    startDate,
  ])

  const handleUpdateReportsData = useCallback(
    (pathnamesToUpdate?: string | string[]) => {
      const pathnames =
        pathnamesToUpdate && Array.isArray(pathnamesToUpdate)
          ? pathnamesToUpdate
          : [pathnamesToUpdate]

      if (pathnames && pathnames.includes(pathname)) {
        const pathToUpdate = {
          [PATHS.financialReports.pnl]: () => {
            if (lastReportTableArgs && 'year' in lastReportTableArgs) {
              apiPnlRequest(lastReportTableArgs)
            }
          },
          [PATHS.financialReports.cashFlow]: () => {
            if (lastReportTableArgs && 'year' in lastReportTableArgs) {
              apiAnalyticsCashFlowReport(lastReportTableArgs)
            }
          },
          [PATHS.financialReports.balance]: () => {
            if (lastReportTableArgs) {
              apiBalanceSheetRequest(lastReportTableArgs)
            }
          },
        }
        pathnames.forEach((path) => {
          if (path === pathname && pathToUpdate[path]) {
            pathToUpdate[path]()
          }
        })
      }
    },
    [
      apiAnalyticsCashFlowReport,
      apiBalanceSheetRequest,
      apiPnlRequest,
      lastReportTableArgs,
      pathname,
    ],
  )

  const handleCloseDrawerAndUpdateData = useCallback(
    (pathnamesToUpdate?: string | string[]) => {
      handleUpdateReportsData(pathnamesToUpdate)
      handleUpdateOperationsTable()
      dispatch(setOperationDrawerState(null))
    },
    [handleUpdateReportsData, handleUpdateOperationsTable, dispatch],
  )

  const handleCloseEditDrawer = useCallback(() => {
    setOpenConfirm(false)
    handleCloseDrawerAndUpdateData()
  }, [handleCloseDrawerAndUpdateData])

  const handleClose = useCallback(() => {
    if (formRef.current?.isDirty) return setOpenConfirm(true)
    handleCloseDrawerAndUpdateData()
  }, [handleCloseDrawerAndUpdateData])

  const handleDisableFooterButtons = useCallback(
    (disabled: boolean) => setDisabledFooter(disabled),
    [],
  )

  const FormComponent = operationDrawer
    ? CREATE_OPERATION_FORMS[operationDrawer.type]
    : null

  const drawerTitle = operationDrawer?.title || ''

  const confirmDialogSuccessButton: ButtonProps = {
    onClick: handleCloseEditDrawer,
    text: 'Закрыть',
  }

  const handleCloseConfirmDialog = useCallback(() => setOpenConfirm(false), [])

  const confirmDialogCancelButton: ButtonProps = {
    onClick: handleCloseConfirmDialog,
    isVisible: true,
    text: 'Отменить',
    color: 'secondary',
  }

  return (
    <>
      <CreateOperationsDrawer
        disabled={disabledFooter}
        isEdit={!!operationDrawer?.operationId}
        open={!!operationDrawer}
        title={drawerTitle}
        onAdd={handleAdd}
        onClose={handleClose}>
        {FormComponent && (
          <FormComponent
            ref={formRef}
            editOperationId={operationDrawer?.operationId}
            onComplete={handleCloseDrawerAndUpdateData}
            onDisabled={handleDisableFooterButtons}
          />
        )}
      </CreateOperationsDrawer>
      <Dialog
        cancelButton={confirmDialogCancelButton}
        isOpen={openConfirm}
        successButton={confirmDialogSuccessButton}
        title={WARNING_DATA_LOSS}
        onClose={handleCancelConfirmClick}
      />
    </>
  )
}
