import React from 'react'

import { render } from '@testEnv/utils'

import { TotalBalanceDataCell } from './TotalBalanceDataCell'
import * as T from './TotalBalanceDataCell.types'

describe('<TotalBalanceDataCell />', () => {
  const cellData = [
    {
      budgetItemId: 1,
      budgetItemName: 'Активы',
      hasChildren: true,
      level: 2,
      sumMismatch: [false, true],
      totalSum: [411.09, 503.01],
    },
  ]

  const renderTotalBalanceDataCell = ({
    rowIndex = 0,
    columnIndex = 0,
    data = cellData,
  }: Partial<T.Props>) =>
    render(
      <TotalBalanceDataCell
        columnIndex={columnIndex}
        data={data}
        rowIndex={rowIndex}
      />,
    )

  describe('when render content', () => {
    it('should display text in "float" number format', async () => {
      const { getByText } = renderTotalBalanceDataCell({})

      expect(getByText('411.09')).toBeInTheDocument()
    })
  })
})
