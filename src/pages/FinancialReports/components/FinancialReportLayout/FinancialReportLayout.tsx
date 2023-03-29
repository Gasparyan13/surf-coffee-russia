import React, { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'

import { AppLoader } from '@app/containers/AppLoader'

import { mb } from '@common/common.styled'

import { YEAR_MONTH_FORMAT } from '@constants'

import { Typography } from '@uiKit'

import { getCurrentMonth, getCurrentYear } from '@utils'

import { getManagerCurrentProjectId } from '@store/deprecated/modules/app/selectors'

import { FinancialReportProvider } from '../../containers/FinancialReportCtx'
import { useOpenReportCell } from '../../hooks/useOpenReportCell/useOpenReportCell'
import { FactOperationsDrawer } from '../FactOperationsDrawer'
import { FinReportHeader } from '../FinReportHeader'
import { FinReportHeaderMessage } from '../FinReportHeader/FinReportHeader.types'
import { PlanOperationsDrawer } from '../PlanOperationsDrawer'
import * as Styled from './FinancialReportLayout.styled'
import { getFormattedFirstDayOfMonth } from './utils/getters'

export const FinancialReportLayout: React.FC = () => {
  const enterpriseId = useSelector(getManagerCurrentProjectId)

  const [year, setYear] = useState(getCurrentYear())
  const [message, setMessage] = useState<FinReportHeaderMessage | null>(null)

  const isCurrentYear = useMemo(() => getCurrentYear() === year, [year])
  const currentMonthNumber = useMemo(
    () => (isCurrentYear ? getCurrentMonth() : 12),
    [isCurrentYear],
  )

  const { isOpen, reportType, handleCellClick, drawer, handleDrawerClose } =
    useOpenReportCell()

  const handleShowMessage = useCallback(
    (newMessage: FinReportHeaderMessage | null) => setMessage(newMessage),
    [],
  )

  const handleChangeYear = useCallback(
    (newYear: string) => setYear(Number(newYear)),
    [],
  )

  const commonDateArgs = { year, month: currentMonthNumber }

  if (!enterpriseId) return <AppLoader />

  return (
    <Styled.Root>
      <Typography css={mb(40)} variant="H2">
        Финансовые отчеты
      </Typography>
      <FinancialReportProvider
        value={{
          enterpriseId,
          year,
          isCurrentYear,
          currentMonthNumber,
          handleChangeYear,
          handleShowMessage,
          expensesDate: getFormattedFirstDayOfMonth(commonDateArgs),
          yearMonth: getFormattedFirstDayOfMonth({
            ...commonDateArgs,
            format: YEAR_MONTH_FORMAT,
          }),
          handleCellClick,
          message,
        }}>
        <>
          <FinReportHeader />
          <Outlet />
        </>
      </FinancialReportProvider>
      <FactOperationsDrawer
        budgetItemId={drawer?.budgetItemId}
        budgetItemName={drawer?.budgetItemName}
        open={isOpen && drawer?.drawerType === 'FactOperations'}
        reportType={reportType}
        yearMonth={drawer?.yearMonth}
        onClose={handleDrawerClose}
      />
      <PlanOperationsDrawer
        budgetItemId={drawer?.budgetItemId}
        budgetItemName={drawer?.budgetItemName}
        open={isOpen && drawer?.drawerType === 'PlanOperations'}
        planOrFactType={drawer?.planOrFactType}
        reportType={reportType}
        yearMonth={drawer?.yearMonth}
        onClose={handleDrawerClose}
      />
    </Styled.Root>
  )
}
