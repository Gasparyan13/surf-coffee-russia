import React from 'react'

import { FinancialReportProvider } from '@pages/FinancialReports/containers/FinancialReportCtx'

import { configFinReportCtxValue } from '@testEnv/mocks/providers/financialReportProvider'
import { fireEvent, render, screen } from '@testEnv/utils'

import { Cell } from './Cell'
import * as T from './Cell.types'

const mockData = [
  {
    budgetItemId: 1,
    budgetItemName: 'Выручка',
    months: {
      Jul: { isActivePlanCell: false, isActiveFactCell: false },
      Oct: {
        plan: 1200,
        fact: -42441,
        isActivePlanCell: false,
        isActiveFactCell: false,
      },
      Feb: { isActivePlanCell: false, isActiveFactCell: false },
      Apr: { isActivePlanCell: false, isActiveFactCell: false },
      Jun: { isActivePlanCell: false, isActiveFactCell: false },
      Aug: { isActivePlanCell: false, isActiveFactCell: false },
      Dec: { isActivePlanCell: false, isActiveFactCell: false },
      May: { isActivePlanCell: false, isActiveFactCell: false },
      Nov: {
        plan: 2645,
        fact: -99,
        isActivePlanCell: true,
        isActiveFactCell: true,
      },
      Jan: { isActivePlanCell: false, isActiveFactCell: false },
      Mar: { isActivePlanCell: false, isActiveFactCell: false },
      Sep: { isActivePlanCell: false, isActiveFactCell: false },
    },
    total: { plan: 3845, fact: -42540 },
    level: 1,
    hasChildren: true,
  },
]

describe('<Cell />', () => {
  const renderCell = ({
    data = mockData,
    monthColumnIndex = 9,
    currentMonthNumber = 11,
    columnType = 'CUSTOM',
    rowIndex = 0,
    onPlanCellClick,
    onFactCellClick,
  }: Partial<T.Props>) =>
    render(
      <FinancialReportProvider
        value={{ ...configFinReportCtxValue({ year: 2022 }) }}>
        <Cell
          columnType={columnType}
          currentMonthNumber={currentMonthNumber}
          data={data}
          monthColumnIndex={monthColumnIndex}
          rowIndex={rowIndex}
          onFactCellClick={onFactCellClick}
          onPlanCellClick={onPlanCellClick}
        />
      </FinancialReportProvider>,
    )

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when render content', () => {
    describe('when render "leftCell" and "rightCell"', () => {
      it('should render content if "columnType" is "PLAN-FACT" and "currentMonthNumber" less than "monthColumnIndex"', async () => {
        renderCell({
          monthColumnIndex: 9,
          currentMonthNumber: 11,
          columnType: 'PLAN-FACT',
        })

        expect(screen.getByText('1 200')).toBeInTheDocument()
        expect(screen.getByText('-42 441')).toBeInTheDocument()
      })

      it('should render content if "columnType" is "CUSTOM" and "currentMonthNumber" less than "monthColumnIndex"', async () => {
        renderCell({
          monthColumnIndex: 9,
          currentMonthNumber: 11,
          columnType: 'CUSTOM',
        })

        expect(screen.getByText('1 200')).toBeInTheDocument()
        expect(screen.getByText('-42 441')).toBeInTheDocument()
      })
    })

    describe('when render half cell', () => {
      describe('when render "leftCell" only', () => {
        it('should render content if "columnType" is "PLAN-FACT" and "currentMonthNumber" greater than "monthColumnIndex"', async () => {
          renderCell({
            monthColumnIndex: 9,
            currentMonthNumber: 8,
            columnType: 'PLAN-FACT',
          })

          expect(screen.getByText('1 200')).toBeInTheDocument()
          expect(screen.queryByText('-42 441')).not.toBeInTheDocument()
        })

        it('should render content if "columnType" is "PLAN" and "currentMonthNumber" greater than "monthColumnIndex"', async () => {
          renderCell({
            monthColumnIndex: 9,
            currentMonthNumber: 8,
            columnType: 'PLAN',
          })

          expect(screen.getByText('1 200')).toBeInTheDocument()
          expect(screen.queryByText('-42 441')).not.toBeInTheDocument()
        })
      })

      describe('when render "rightCell" only', () => {
        it('should render content if "columnType" is "CUSTOM" and "currentMonthNumber" greater than "monthColumnIndex"', async () => {
          renderCell({
            monthColumnIndex: 9,
            currentMonthNumber: 8,
            columnType: 'CUSTOM',
          })

          expect(screen.queryByText('1 200')).not.toBeInTheDocument()
          expect(screen.getByText('-42 441')).toBeInTheDocument()
        })

        it('should render content if "columnType" is "FACT" and "currentMonthNumber" greater than "monthColumnIndex"', async () => {
          renderCell({
            monthColumnIndex: 9,
            currentMonthNumber: 8,
            columnType: 'FACT',
          })

          expect(screen.queryByText('1 200')).not.toBeInTheDocument()
          expect(screen.getByText('-42 441')).toBeInTheDocument()
        })

        it('should render content if "columnType" is "FACT" and "currentMonthNumber" less than "monthColumnIndex"', async () => {
          renderCell({
            monthColumnIndex: 9,
            currentMonthNumber: 11,
            columnType: 'FACT',
          })

          expect(screen.queryByText('1 200')).not.toBeInTheDocument()
          expect(screen.getByText('-42 441')).toBeInTheDocument()
        })
      })
    })

    describe('when click on cell', () => {
      it('should call "onPlanCellClick" if user click on "leftCell"', async () => {
        const mockOnPlanCellClick = jest.fn()

        renderCell({
          columnType: 'PLAN-FACT',
          onPlanCellClick: mockOnPlanCellClick,
        })

        fireEvent.click(screen.getByText('1 200'))

        expect(mockOnPlanCellClick).toHaveBeenCalledWith({
          budgetItemId: 1,
          budgetItemName: 'Выручка',
          date: '2022-10-01',
          isEditable: false,
          text: '1200',
          yearMonth: '2022-10',
        })
      })

      it('should call "onFactCellClick" if user click on "rightCell"', async () => {
        const mockOnFactCellClick = jest.fn()

        renderCell({
          columnType: 'PLAN-FACT',
          onFactCellClick: mockOnFactCellClick,
        })

        fireEvent.click(screen.getByText('-42 441'))

        expect(mockOnFactCellClick).toHaveBeenCalledWith({
          budgetItemId: 1,
          budgetItemName: 'Выручка',
          date: '2022-10-01',
          isEditable: false,
          text: '-42441',
          yearMonth: '2022-10',
        })
      })
    })
  })
})
