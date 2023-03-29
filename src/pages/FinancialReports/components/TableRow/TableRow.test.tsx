import React from 'react'

import { render, screen } from '@testEnv/utils'

import { RowCellProps } from '../TableCell/TableCell.types'
import { TableRow } from './TableRow'
import * as T from './TableRow.types'

jest.mock('../TableCell', () => ({
  TableCell: ({
    isCurrentMonth,
    isEditable,
    isNumber,
    tableColumnType,
    text,
    onClick,
    children,
  }: Record<string, string>) => (
    <div
      data-iscurrentmonth={isCurrentMonth}
      data-iseditable={isEditable}
      data-isnumber={isNumber}
      data-onclick={typeof onClick}
      data-tablecolumntype={tableColumnType}
      data-testid={`TableCell-${text}`}
      data-text={text}>
      {children}
    </div>
  ),
}))

jest.mock('../TableCell/components/CellContent', () => ({
  CellContent: ({
    disabled,
    isEditable,
    isNumber,
    tableColumnType,
    testId,
    text,
    type,
  }: Record<string, string>) => (
    <div
      data-disabled={disabled}
      data-iseditable={isEditable}
      data-isnumber={isNumber}
      data-tablecolumntype={tableColumnType}
      data-testid={testId}
      data-type={type}>
      {text}
    </div>
  ),
}))

const mockData: RowCellProps = {
  leftCell: {
    id: 1,
    isNumber: false,
    isEditable: false,
    testId: 'leftCell',
    text: 'leftCell',
    type: 'REGULAR',
    disabled: false,
  },
  rightCell: {
    id: 2,
    isNumber: true,
    isEditable: true,
    testId: 'rightCell',
    text: 'rightCell',
    type: 'BOLD',
    disabled: true,
  },
}

describe('<TableRow />', () => {
  const renderTableRow = ({
    leftCell,
    rightCell,
    isCurrentMonth = true,
    tableColumnType = 'MAIN',
    onPlanCellClick = () => {},
    onFactCellClick = () => {},
  }: Partial<T.Props>) =>
    render(
      <TableRow
        isCurrentMonth={isCurrentMonth}
        leftCell={leftCell}
        rightCell={rightCell}
        tableColumnType={tableColumnType}
        onFactCellClick={onFactCellClick}
        onPlanCellClick={onPlanCellClick}
      />,
    )

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('when render content', () => {
    it('should NOT render content', async () => {
      renderTableRow({})

      expect(
        screen.queryByText(mockData.leftCell!.text!),
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText(mockData.rightCell!.text!),
      ).not.toBeInTheDocument()
    })

    it('should render "leftCell" and "rightCell"', async () => {
      renderTableRow({
        leftCell: mockData.leftCell,
        rightCell: mockData.rightCell,
      })

      expect(screen.getByText(mockData.leftCell!.text!)).toBeInTheDocument()
      expect(screen.getByText(mockData.rightCell!.text!)).toBeInTheDocument()
    })

    it('should render "leftCell" only', async () => {
      renderTableRow({
        leftCell: mockData.leftCell,
      })

      expect(screen.getByText(mockData.leftCell!.text!)).toBeInTheDocument()
      expect(
        screen.queryByText(mockData.rightCell!.text!),
      ).not.toBeInTheDocument()
    })

    it('should render "rightCell" only', async () => {
      renderTableRow({
        rightCell: mockData.rightCell,
      })

      expect(screen.getByText(mockData.rightCell!.text!)).toBeInTheDocument()
      expect(
        screen.queryByText(mockData.leftCell!.text!),
      ).not.toBeInTheDocument()
    })
  })

  describe('when render children components', () => {
    describe('when render "leftCell"', () => {
      it('should right props to "TableCell" component', async () => {
        renderTableRow({
          leftCell: mockData.leftCell,
        })

        const tableCell = screen.getByTestId(
          `TableCell-${mockData.leftCell!.text}`,
        )

        expect(tableCell).toHaveAttribute('data-iscurrentmonth', 'true')
        expect(tableCell).toHaveAttribute('data-iseditable', 'false')
        expect(tableCell).toHaveAttribute('data-isnumber', 'false')
        expect(tableCell).toHaveAttribute('data-onclick', 'function')
        expect(tableCell).toHaveAttribute('data-tablecolumntype', 'MAIN')
        expect(tableCell).toHaveAttribute('data-text', 'leftCell')
      })

      it('should right props to "CellContent" component', async () => {
        renderTableRow({
          leftCell: mockData.leftCell,
        })

        const cellContent = screen.getByText(mockData.leftCell!.text!)

        expect(cellContent).toHaveAttribute('data-disabled', 'false')
        expect(cellContent).toHaveAttribute('data-iseditable', 'false')
        expect(cellContent).toHaveAttribute('data-isnumber', 'false')
        expect(cellContent).toHaveAttribute('data-tablecolumntype', 'MAIN')
        expect(cellContent).toHaveAttribute('data-testid', 'leftCell')
        expect(cellContent).toHaveAttribute('data-type', 'REGULAR')
      })
    })

    describe('when render "rightCell"', () => {
      it('should right props to "TableCell" component', async () => {
        renderTableRow({
          rightCell: mockData.rightCell,
        })

        const tableCell = screen.getByTestId(
          `TableCell-${mockData.rightCell!.text}`,
        )

        expect(tableCell).toHaveAttribute('data-iscurrentmonth', 'true')
        expect(tableCell).toHaveAttribute('data-iseditable', 'true')
        expect(tableCell).toHaveAttribute('data-isnumber', 'true')
        expect(tableCell).toHaveAttribute('data-onclick', 'function')
        expect(tableCell).toHaveAttribute('data-tablecolumntype', 'MAIN')
        expect(tableCell).toHaveAttribute('data-text', 'rightCell')
      })

      it('should right props to "CellContent" component', async () => {
        renderTableRow({
          rightCell: mockData.rightCell,
        })

        const cellContent = screen.getByText(mockData.rightCell!.text!)

        expect(cellContent).toHaveAttribute('data-disabled', 'true')
        expect(cellContent).toHaveAttribute('data-iseditable', 'true')
        expect(cellContent).toHaveAttribute('data-isnumber', 'true')
        expect(cellContent).toHaveAttribute('data-tablecolumntype', 'MAIN')
        expect(cellContent).toHaveAttribute('data-testid', 'rightCell')
        expect(cellContent).toHaveAttribute('data-type', 'BOLD')
      })
    })
  })
})
