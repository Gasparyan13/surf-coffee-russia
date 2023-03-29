import React, { lazy } from 'react'

import { PATHS, ROLES } from '@common/constants'

import { BalanceReport } from '@pages/FinancialReports/components/BalanceReport'
import { CashFlowReport } from '@pages/FinancialReports/components/CashFlowReport'
import { PnLReport } from '@pages/FinancialReports/components/PnLReport'
import { EmployeesListLayout } from '@pages/StaffPage/components'

import { Role } from '@store/deprecated/modules/app/types'

type ChildrenRoute = {
  to: string
  component: JSX.Element
}

export type Route = {
  caption: string
  to: string
  component: React.FC
  scopes: Role[]
  customLayout?: boolean
  children?: ChildrenRoute[]
}

export type Routes = Array<Route>

const Dashboard = lazy(() => import('@pages/Dashboard'))
const WelcomePage = lazy(() => import('pages/WelcomePage'))
const Operations = lazy(() => import('@pages/Operations'))
const FinancialReports = lazy(() => import('@pages/FinancialReports'))
const StaffPage = lazy(() => import('@pages/StaffPage'))

export const routes: Routes = [
  {
    caption: 'Добро пожаловать',
    to: PATHS.main,
    component: Dashboard,
    scopes: [ROLES.manager, ROLES.admin],
  },
  {
    caption: 'Конфигурация спота',
    to: PATHS.spotConfiguration,
    component: WelcomePage,
    scopes: [ROLES.manager, ROLES.admin],
  },
  {
    caption: 'Операции',
    to: PATHS.operations,
    component: Operations,
    scopes: [ROLES.manager, ROLES.admin],
  },
  {
    caption: 'Финансовые отчеты',
    to: PATHS.financialReports.main,
    children: [
      {
        to: PATHS.financialReports.pnl,
        component: <PnLReport />,
      },
      {
        to: PATHS.financialReports.cashFlow,
        component: <CashFlowReport />,
      },
      {
        to: PATHS.financialReports.balance,
        component: <BalanceReport />,
      },
    ],
    component: FinancialReports,
    scopes: [ROLES.manager, ROLES.admin],
    customLayout: true,
  },
  {
    caption: 'Персонал',
    to: PATHS.staff.main,
    component: StaffPage,
    scopes: [ROLES.manager, ROLES.admin],
    customLayout: true,
    children: [
      {
        to: PATHS.staff.employeesList,
        component: <EmployeesListLayout />,
      },
    ],
  },
]
