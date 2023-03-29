import { useCallback, useState } from 'react'
import { useLocation } from 'react-router'

import { getOperationDrawerState } from '@pages/CreateOperations/redux/createOperation/selectors'

import { useAppSelector } from '@store/rootConfig'

import { reportTypes, SALARY_EXPENSES_IDS } from './constants'
import * as T from './useOpenReportCell.types'

export const useOpenReportCell = (): T.HookReturn => {
  const editOperationDrawerState = useAppSelector(getOperationDrawerState)

  const { pathname } = useLocation()

  const [drawer, setDrawer] = useState<T.ReportDrawer>(null)

  const isOpen =
    !!drawer?.budgetItemId && !editOperationDrawerState?.operationId
  const reportType = reportTypes[pathname]

  const handleDrawerClose = useCallback(() => setDrawer(null), [])

  const openDrawer: T.OpenDrawerFunc = useCallback((config, additional) => {
    const { budgetItemName, text, planOrFactType, budgetItemId, yearMonth } =
      config
    if (planOrFactType && budgetItemName) {
      return setDrawer({
        budgetItemId,
        budgetItemName,
        planOrFactType,
        text,
        yearMonth,
        date: `${yearMonth}-01`,
        ...additional,
      })
    }
  }, [])

  const handleCellClick: T.HookReturn['handleCellClick'] = useCallback(
    (planOrFactType: T.PlanOrFactType) => (args) => {
      const config = { planOrFactType, ...args }

      const { budgetItemId, isEditable } = config
      if (!isEditable) return

      if (SALARY_EXPENSES_IDS.some((id) => id === budgetItemId)) {
        return openDrawer(config, {
          drawerType: 'WageFund',
        })
      }

      openDrawer(config, {
        drawerType:
          config.planOrFactType === 'plan'
            ? 'PlanOperations'
            : 'FactOperations',
      })
    },
    [openDrawer],
  )

  return {
    isOpen,
    reportType,
    handleCellClick,
    drawer,
    handleDrawerClose,
  }
}
